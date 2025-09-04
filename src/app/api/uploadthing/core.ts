import { createId } from "@paralleldrive/cuid2";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { db } from "~/db";
import { uploadsTable } from "~/db/schema";
import { auth } from "~/lib/auth";

const f = createUploadthing();
// FileRouter for the app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      // Allow multiple images for a gallery
      maxFileCount: 10,
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // Get the user session using auth.api.getSession
      const session = await auth.api.getSession({ headers: req.headers });

      // If you throw, the user will not be able to upload
      if (!session?.user?.id) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      // Ensure userId is correctly passed
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      // This code RUNS ON THE SERVER after upload
      console.log("Upload complete for userId (image):", metadata.userId);
      console.log("file url", file.ufsUrl); // Public CDN URL is useful info
      console.log("file key", file.key);

      // Save the upload details to the database
      try {
        await db.insert(uploadsTable).values({
          id: createId(),
          key: file.key,
          type: "image",
          url: file.ufsUrl, // Store the public CDN URL
          userId: metadata.userId,
        });
        console.log(
          "Saved image upload details to database for userId:",
          metadata.userId,
        );
      } catch (error) {
        console.error(
          "Failed to save image upload details to database:",
          error,
        );
        // Optionally, you might want to delete the file from UploadThing if DB insert fails
        // await utapi.deleteFiles(file.key);
        throw new UploadThingError("Failed to process upload metadata.");
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      // Return necessary info, like the file URL or key, if needed on the client
      return {
        fileKey: file.key,
        fileUrl: file.ufsUrl,
        uploadedBy: metadata.userId,
      };
    }),

  // New route for video uploads
  videoUploader: f({
    video: { maxFileCount: 5, maxFileSize: "64MB" },
  })
    .middleware(async ({ req }) => {
      // Same middleware logic as imageUploader
      const session = await auth.api.getSession({ headers: req.headers });
      if (!session?.user?.id) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("Upload complete for userId (video):", metadata.userId);
      console.log("file url", file.ufsUrl); // Public CDN URL is useful info
      console.log("file key", file.key);

      // Save the upload details to the database
      try {
        await db.insert(uploadsTable).values({
          id: createId(),
          key: file.key,
          type: "video", // Explicitly set type to video
          url: file.ufsUrl,
          userId: metadata.userId,
        });
        console.log(
          "Saved video upload details to database for userId:",
          metadata.userId,
        );
      } catch (error) {
        console.error(
          "Failed to save video upload details to database:",
          error,
        );
        throw new UploadThingError("Failed to process upload metadata.");
      }

      return {
        fileKey: file.key,
        fileUrl: file.ufsUrl,
        uploadedBy: metadata.userId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
