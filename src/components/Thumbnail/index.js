import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Thumbnail({
  id,
  image_url,
  name,
  tagline,
  first_brewed,
  onViewDetail,
}) {
  return (
    <div className="thumbnail" data-testid="thumbnail">
      <LazyLoadImage className="thumbnail-img" src={image_url} alt={name} />
      <div className="thumbnail-detail">
        <h3 className="thumbnail-detail__title">{name}</h3>
        <p>{first_brewed}</p>
        <button
          className="thumbnail-detail__btn"
          onClick={() => onViewDetail(id)}
        >
          view detail{" "}
        </button>
      </div>
    </div>
  );
}

export default Thumbnail;
