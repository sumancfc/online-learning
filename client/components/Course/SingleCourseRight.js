import ReactPlayer from "react-player";
import { Button } from "antd";

const SingleCourseRight = ({
  user,
  course,
  modalOpen,
  setModalOpen,
  setVideoPreview,
  paidCourseHandle,
  freeCourseHandle,
  enrolledCourse,
  setEnrolledCourse,
}) => {
  const { name, image, paid, lessons } = course;
  return (
    <div className='col-md-4 position-relative'>
      <div className=''>
        {lessons[0].video && lessons[0].video.Location ? (
          <div
            onClick={() => {
              setVideoPreview(lessons[0].video.Location);
              setModalOpen(!modalOpen);
            }}
          >
            <ReactPlayer
              className='react-player-div'
              url={lessons[0].video.Location}
              light={image.Location}
              width='100%'
              height='225px'
            />
          </div>
        ) : (
          <>
            <img src={image.Location} alt={name} className='img img-fluid' />
          </>
        )}
      </div>
      <div className='mt-3'>
        <Button
          type='primary'
          block
          shape='round'
          size='large'
          onClick={paid ? paidCourseHandle : freeCourseHandle}
        >
          {user
            ? enrolledCourse.status
              ? "Go to course"
              : "Enroll"
            : "Login to enroll"}
        </Button>
      </div>
    </div>
  );
};

export default SingleCourseRight;
