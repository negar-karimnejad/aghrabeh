import SingleService from "../SingleService/SingleService";
import "./Services.css";

function Services() {
  return (
    <div className="container">
      <div className="services">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12">
            <SingleService
              link="/service/installment-buying"
              src="/images/services/qesti.jpg"
            />
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <SingleService src="/images/services/2.jpg" />
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <SingleService src="/images/services/3.jpg" />
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <SingleService src="/images/services/4.jpg" />
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <SingleService src="/images/services/5.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
