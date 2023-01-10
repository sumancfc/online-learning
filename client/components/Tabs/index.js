import { Tabs } from "antd";
import { AiFillStar } from "react-icons/ai";
const { TabPane } = Tabs;

const Tab = ({ course }) => {
  const onChange = (key) => {
    console.log(key);
  };

  const { name, description } = course;

  return (
    <Tabs defaultActiveKey='1' onChange={onChange}>
      <TabPane tab='Overview' key='overview'>
        <div className='position-relative'>
          <div className='p-4'>
            <h4>Course Details</h4>
            <p className='lead'>{description}</p>
            {/* <p className='lead'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <ul className='my-3 d-flex align-items-center list-unstyled gap-5 '>
              <li className='fs-6'>23,564 Total Students</li>
              <li>
                <span>5</span>
                <AiFillStar color='red' />
                <AiFillStar color='red' />
                <AiFillStar color='red' />
                <AiFillStar color='red' />
                <AiFillStar color='red' /> (1254 Rating)
              </li>

              <li className='fs-6'>256 Reviews</li>
            </ul>
            <h3>What you'll learn?</h3>
            <ul className='fs-6'>
              <li>Lorem Ipsum is simply dummy text of the new design</li>
              <li>Lorem Ipsum is simply dummy text of the new design</li>
              <li>Lorem Ipsum is simply dummy text of the new design</li>
              <li>Lorem Ipsum is simply dummy text of the new design</li>
              <li>Lorem Ipsum is simply dummy text of the new design</li>
              <li>Lorem Ipsum is simply dummy text of the new design</li>
              <li>
                Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel
                justo
              </li>
            </ul>
            <h3>Requirements</h3>
            <ul className='fs-6'>
              <li>Lorem Ipsum is simply dummy text of the new design</li>
              <li>Lorem Ipsum is simply dummy text of the new design</li>
              <li>Lorem Ipsum is simply dummy text of the new design</li>
              <li>
                Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel
                justo
              </li>
            </ul> */}
          </div>
        </div>
      </TabPane>
      <TabPane tab='Curriculum' key='curriculum'></TabPane>
      <TabPane tab='Instructor' key='instructor'></TabPane>
      <TabPane tab='Faq' key='faq'></TabPane>
    </Tabs>
  );
};

export default Tab;
