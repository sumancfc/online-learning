import Link from "next/link";
import { RiComputerFill } from "react-icons/ri";
import Icon from "../Icon";
import SubTitle from "../Section/SubTitle";
import SectionTitle from "../Section/Title";

const CategorySection = () => {
  return (
    <div className='category-section pt-8 pb-8'>
      <div className='container'>
        <div className='text-center'>
          <SubTitle subTitle='Popular Category' />
          <SectionTitle titleName='Popular Category For Learn' />
        </div>
        <div>
          <div className='row g-2 justify-content-center row-cols-xl-6 row-cols-md-3 row-cols-sm-2 row-cols-1'>
            <div className='col'>
              <div className='text-center'>
                <div style={{ padding: "2rem" }}>
                  <div className='category-thumb'>
                    <Icon iconName={"FaDesktop"} className='category-icon' />
                  </div>
                  <div className='category-content'>
                    <a href='/course'>
                      <h6>Computer Science</h6>
                    </a>
                    <span>24 Course</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='col'>
              <div className='category-item text-center'>
                <div className='category-inner'>
                  <div className='category-thumb'>
                    <Icon iconName={"FaDesktop"} />
                  </div>
                  <div className='category-content'>
                    <a href='/course'>
                      <h6>Computer Science</h6>
                    </a>
                    <span>24 Course</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='text-center mt-5'>
            <Link href='' className='btn-secondary'>
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
