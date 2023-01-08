import ReactPlayer from "react-player";
import { Button, Progress, Switch } from "antd";

const UpdateLessonForm = ({
  currentLesson,
  setCurrentLesson,
  uploadVideoHandle,
  updateLesson,
  uploadVideoButton,
  videoProgress,
  videoUploading,
}) => {
  return (
    <div>
      <form onSubmit={updateLesson}>
        <input
          type='text'
          className='form-control square'
          onChange={(e) =>
            setCurrentLesson({ ...currentLesson, title: e.target.value })
          }
          value={currentLesson.title}
          autoFocus
          required
        />

        <textarea
          className='form-control mt-3'
          cols='7'
          rows='7'
          onChange={(e) =>
            setCurrentLesson({ ...currentLesson, content: e.target.value })
          }
          value={currentLesson.content}
        ></textarea>

        <div>
          {!videoUploading &&
            currentLesson.video &&
            currentLesson.video.Location && (
              <div className='pt-2 d-flex justify-content-center'>
                <ReactPlayer
                  url={currentLesson.video.Location}
                  width='410px'
                  height='240px'
                  controls
                />
              </div>
            )}

          <label className='btn btn-dark btn-block text-left mt-3'>
            {uploadVideoButton}
            <input
              onChange={uploadVideoHandle}
              type='file'
              accept='video/*'
              hidden
            />
          </label>
        </div>

        {videoProgress > 0 && (
          <Progress
            className='d-flex justify-content-center pt-2'
            percent={videoProgress}
            steps={10}
          />
        )}

        <div className='d-flex justify-content-between'>
          <h5 className='pt-3 text-primary'>Video Preview</h5>
          <Switch
            className='float-right mt-2'
            disabled={videoUploading}
            checked={currentLesson.free_video_preview}
            name='free_video_preview'
            onChange={(v) =>
              setCurrentLesson({ ...currentLesson, free_video_preview: v })
            }
          />
        </div>

        <Button
          onClick={updateLesson}
          className='col mt-3'
          size='large'
          type='primary'
          loading={videoUploading}
          shape=''
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
