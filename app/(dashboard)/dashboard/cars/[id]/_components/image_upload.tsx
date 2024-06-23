"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CircleDashed, Image, PlusIcon, Upload } from "lucide-react";
import { uploadImage } from "@/actions/cars/image-upload";
import { useTransition } from "react";
import { CldUploadButton } from "next-cloudinary";

const ImageUpload = ({ car_id }: { car_id: number }) => {
	const [pending, startTransition] = useTransition();

	return (
		<div className="mt-4">
			<CldUploadButton
				className="flex flex-row px-4 py-2 text-white rounded-md bg-primary disabled:bg-muted/40 disabled:cursor-not-allowed"
				onSuccess={(results) => {
					if (
						results.event !== "success" ||
						results.info === null ||
						typeof results.info === "string" ||
						typeof results.info !== "object"
					)
						return;

					console.log(results);

					const formData = new FormData();
					formData.append("image_url", results.info.url);
					formData.append("car_id", car_id.toString());
					console.log("uploading image");
					startTransition(async () => {
						await uploadImage(formData);
					});
				}}
				uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
			><Image className="mr-1" />Add Image</CldUploadButton>
		</div>
	);
};
export default ImageUpload;
