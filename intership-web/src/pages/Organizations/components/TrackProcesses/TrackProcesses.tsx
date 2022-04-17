import React from 'react';
import s from './track.module.scss';

interface Props {
  postProcesses: number;
  deleteProcesses: number;
  editProcesses: number;
}

export const TrackProcesses: React.FC<Props> = ({
  postProcesses,
  deleteProcesses,
  editProcesses,
}) => {
  return (
    <div>
      {postProcesses + deleteProcesses + editProcesses > 0 && (
        <div className={s.inProcess}>
          {postProcesses > 0 && <p>{`Posting posts: ${postProcesses}`}</p>}
          {deleteProcesses > 0 && <p>{`Deleting posts: ${deleteProcesses}`}</p>}
          {editProcesses > 0 && <p>{`Editing posts: ${editProcesses}`}</p>}
        </div>
      )}
    </div>
  );
};
