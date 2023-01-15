import { Tabs, List, Avatar } from "antd";
const { TabPane } = Tabs;
const { Item } = List;

const Tab = ({ course, modalOpen, setModalOpen, setVideoPreview }) => {
  const onChange = (key) => {
    console.log(key);
  };

  const {  description, lessons } = course;

  return (
    <Tabs defaultActiveKey='1' onChange={onChange}>
      <TabPane tab='Overview' key='overview'>
        <div className='position-relative'>
          <div className='p-4'>
            <h4>Course Details</h4>
            <p className='lead'>{description}</p>
          </div>
        </div>
      </TabPane>
      <TabPane tab='Curriculum' key='curriculum'>
        {lessons && (
          <List
            itemLayout='horizontal'
            dataSource={lessons}
            renderItem={(lesson, i) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{i + 1}</Avatar>}
                  title={lesson.title}
                />
                {lesson.video &&
                  lesson.video !== null &&
                  lesson.free_video_preview && (
                    <span
                      className='text-primary cursor-pointer'
                      onClick={() => {
                        setVideoPreview(lesson.video.Location);
                        setModalOpen(!modalOpen);
                      }}
                    >
                      Preview
                    </span>
                  )}
              </Item>
            )}
          />
        )}
      </TabPane>
      <TabPane tab='Instructor' key='instructor'></TabPane>
      <TabPane tab='Faq' key='faq'></TabPane>
    </Tabs>
  );
};

export default Tab;
