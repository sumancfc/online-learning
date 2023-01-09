import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Icon from "../Icon";
import SubTitle from "../Section/SubTitle";
import SectionTitle from "../Section/Title";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    allCategories();
  }, []);

  const allCategories = async () => {
    const { data } = await axios.get("/api/v1/category/all");
    setCategories(data);
  };

  return (
    <div className='section category-section bg-1'>
      <div className='container'>
        <div className='text-center'>
          <SubTitle subTitle='Popular Category' />
          <SectionTitle titleName='Popular Category For Learn' />
        </div>
        <div>
          <div className='row g-2 justify-content-center'>
            {categories.map((category) => (
              <div className='col' key={category._id}>
                <div className='text-center'>
                  <div style={{ padding: "2rem" }}>
                    <div>
                      <Icon iconName={"FaDesktop"} className='category-icon' />
                    </div>
                    <div className='mt-3 cat-name'>
                      <Link href={`/categories/${category.slug}`}>
                        {category.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='text-center mt-5'>
            <Link href='/categories' className='btn-secondary'>
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
