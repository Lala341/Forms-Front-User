import React from "react";
import ImageUploading from "react-images-uploading";
import Button from '@material-ui/core/Button';


export default function Image() {
  const maxNumber = 69;
  const onChange = imageList => {
    // data for submit
    console.log(imageList);
  };
  return (
    <div className="Image" style={{textAlign: "center", minHeight:"100%"}}>
      <ImageUploading multiple onChange={onChange} maxNumber={maxNumber}>
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          // write your building UI
          <div className="upload__image-wrapper" style={{textAlign: "center", paddingTop:"20%"}}>
            <Button variant="contained" onClick={onImageUpload}>Upload images</Button>&nbsp;
            <Button variant="contained" onClick={onImageRemoveAll}>Remove all images</Button>
            {imageList.map(image => (
              <div key={image.key} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <Button variant="contained"
                    onClick={() => {
                      image.onUpdate();
                    }}
                  >
                    Update
                  </Button>
                  <Button variant="contained" onClick={image.onRemove}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

