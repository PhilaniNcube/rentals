import { getCarById } from "@/lib/fetchers/cars";
import EditCarDetails from "./_components/edit-car-details";
import ImageUpload from "./_components/image_upload";

const CarPage = async ({ params: { id } }: { params: { id: number } }) => {
	const { car, error } = await getCarById(id);

	if (error) {
		return <div>{error.message}</div>;
	}

	return (
		<div>
			<EditCarDetails car={car} />
      <div className="flex items-start gap-x-6">
       <div className="flex flex-row items-start py-10 gap-x-3">
         <ImageUpload car_id={id} />
        {car.car_images.map((image) => (
          <img key={image.id} src={image.image_url} className="object-cover w-1/4 rounded-md" alt={car.make} />
        ))}
        </div>
      </div>
		</div>
	);
};
export default CarPage;
