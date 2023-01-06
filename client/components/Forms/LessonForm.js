import { Button, Progress, Tooltip } from "antd";
import { AiFillCloseCircle } from "react-icons/ai";

const LessonForm = ({
  values,
  setValues,
  videoUploading,
  uploadButton,
  videoInProgress,
  uploadVideoHandle,
  removeVideoHandle,
  addLessonHandle,
}) => {
  const { title, content, video } = values;
  return (
    <div className='container pt-3'>
      <form onSubmit={addLessonHandle}>
        <input
          type='text'
          className='form-control'
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={title}
          placeholder='Title'
          autoFocus
          required
        />

        <textarea
          className='form-control mt-3'
          cols='7'
          rows='7'
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={content}
          placeholder='Content'
        ></textarea>

        <div className='d-flex justify-content-center'>
          <label className='btn btn-dark btn-block text-left mt-3'>
            {uploadButton}
            <input
              onChange={uploadVideoHandle}
              type='file'
              accept='video/*'
              hidden
            />
          </label>

          {!videoUploading && video.Location && (
            <Tooltip title='Remove'>
              <span onClick={removeVideoHandle} className='pt-1 pl-3'>
                <AiFillCloseCircle className='fs-3' />
              </span>
            </Tooltip>
          )}
        </div>

        {videoInProgress > 0 && (
          <Progress
            className='d-flex justify-content-center pt-2'
            percent={videoInProgress}
            steps={10}
          />
        )}

        <Button
          onClick={addLessonHandle}
          className='col mt-3'
          size='large'
          type='primary'
          loading={videoUploading}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default LessonForm;
