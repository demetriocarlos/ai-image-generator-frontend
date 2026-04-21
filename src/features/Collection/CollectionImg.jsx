import { useParams } from "react-router-dom";
import { useGetCollectionImg } from "../../hooks/useCollection"
import { ImgGrid } from "../../Components/ImgGrid";
import { Spinner } from "../../Components/Spinner";
import { useState } from "react";
import { ImageDetailModal } from "../../Components/ImageDetailModal";


export const CollectionImg = () => {
    const collectionId = useParams().id;
     const [selectedImage, setSelectedImage] = useState(/*FEED_IMAGES ||*/ null);
    const {data:collection, isLoading, error} = useGetCollectionImg(collectionId);
     
      if(isLoading) return <div><Spinner/></div>
     
      if (error) return <div><ErrorMessage  message={error.message} text={"Ha ocurrido un error"} /></div>
       

      //console.log('collection', collection)
       
  return (
    <div> 

        <ImgGrid
            imagenes={collection.data.images}
            setSelectedImage={setSelectedImage}
        />

        {/* Modal de detalles */}
              {
                selectedImage && (
                  <ImageDetailModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                  />
                )
              }
    </div>
  )
}
