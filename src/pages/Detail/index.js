import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../provider/context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { api } from "../../../api/punk-api";
function Detail() {
  const { beerList, lightMode } = useContext(GlobalContext);
  const [detail, setDetail] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const beer = await api.getBeerById(id);
      setDetail(beer);
    })();
  }, [id]);

  return (
    <section
      className={`detail ${lightMode && "detail__light"}`}
      data-testid="detail-container"
    >
      {!!detail && (
        <>
          <h2 className="detail-title" data-testid="detail-title">
            {detail.name}
          </h2>
          <div className="detail-container">
            <div className="detail-img">
              <LazyLoadImage
                src={detail.image_url}
                className="detail-img__content"
                alt={detail.name}
              />
            </div>
            <div className="detail-content">
              <div className="detail-item">
                <h3 className="detail-item__title">Description</h3>
                <h3 className="detail-item__text">{detail.description}</h3>
              </div>
              <div className="detail-item">
                <h3 className="detail-item__title">Date of first brewed</h3>
                <h3 className="detail-item__text">{detail.first_brewed}</h3>
              </div>
              <div className="detail-item">
                <h3 className="detail-item__title">Brewer's Tip</h3>
                <h3 className="detail-item__text">{detail.brewers_tips}</h3>
              </div>
              <div className="detail-item">
                <h3 className="detail-item__title">Food Pairing</h3>
                <h3 className="detail-item__text">
                  {detail.food_pairing.join(", ")}
                </h3>
              </div>
              <div className="detail-item">
                <h3 className="detail-item__title">Contributor</h3>
                <h3 className="detail-item__text">{detail.contributed_by}</h3>
              </div>
              <div className="detail-item">
                <h3 className="detail-item__title">Details</h3>
                <div className="detail-item__container">
                  <div className="detail-info">
                    <h6 className="detail-info__title">abv</h6>
                    <h6 className="detail-info__content">{detail.abv}</h6>
                  </div>
                  <div className="detail-info">
                    <h6 className="detail-info__title">ebc</h6>
                    <h6 className="detail-info__content">{detail.ebc}</h6>
                  </div>
                  <div className="detail-info">
                    <h6 className="detail-info__title">ibu</h6>
                    <h6 className="detail-info__content">{detail.ibu}</h6>
                  </div>
                  <div className="detail-info">
                    <h6 className="detail-info__title">ph</h6>
                    <h6 className="detail-info__content">{detail.ph}</h6>
                  </div>
                  <div className="detail-info">
                    <h6 className="detail-info__title">srm</h6>
                    <h6 className="detail-info__content">{detail.srm}</h6>
                  </div>
                  <div className="detail-info">
                    <h6 className="detail-info__title">attenuation level</h6>
                    <h6 className="detail-info__content">
                      {detail.attenuation_level}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="detail-item">
                <button className="btn-back" onClick={() => navigate(-1)}>
                  back
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Detail;
