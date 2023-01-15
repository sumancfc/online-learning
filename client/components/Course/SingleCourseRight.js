import ReactPlayer from "react-player";

const SingleCourseRight = ({
  course,
  modalOpen,
  setModalOpen,
  setVideoPreview,
}) => {
  const { name, image, lessons } = course;
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
    </div>
  );
};

export default SingleCourseRight;
