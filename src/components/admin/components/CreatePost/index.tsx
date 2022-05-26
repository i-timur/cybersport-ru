import {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import EditorJS, {API, OutputBlockData, OutputData} from '@editorjs/editorjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Header from '@editorjs/header';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Checklist from '@editorjs/checklist';
import {toast, ToastContainer} from 'react-toastify';

import './index.scss';
import {Btn} from '../ui/Btn';
import {Input} from '../ui/Input';
import {http} from '../../../../client';
import {Category, Post} from '../../../../types';
import {Common, Dota2} from '../../../../assets/images';
import {getCategoryImage} from '../../../../utils';


export const CreatePost: FC = () => {
  const [title, setTitle] = useState('');
  const [data, setData] = useState<OutputData | null>(null);
  const [game, setGame] = useState<Category | null>(null);
  const [gameImg, setGameImg] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    http.get(`https://cybersport-ru-99b29-default-rtdb.firebaseio.com/categories.json`)
      .then((categories: any) => {
        setCategories(categories);
        setGame(categories[0]);
        setGameImg(getCategoryImage(categories[0].value));
      })
      .catch(() => {});
  }, []);

  const handleGameChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (categories) {
      setGame(categories.find((el) => el.value === event.target.value) || null);
    }
    setGameImg(getCategoryImage(event.target.value));
  };

  const notify = () => {
    toast.success('Опубликовано!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: false
    });
  };

  const initEditor = () => {
    const editorJs = new EditorJS({
      holder: 'editor',
      tools: {
        header: Header,
        checklist: Checklist
      },
      onReady: () => {
        editorRef.current = editorJs;
      },
      onChange: (api: API, event: CustomEvent) => {
        api.saver.save()
          .then((saved) => {
            setData(saved);
          })
          .catch(() => {});
      }
    });
  };

  const handleBtnClick = () => {
    if (title && data?.blocks.length) {
      const post: Post = {
        date: new Date(),
        title,
        data,
        game: game ?? {value: 'error', name: 'No such category'},
        commentsCount: 0
      };

      http.post('posts.json', post)
        .then(() => {
          setTitle('');
          setData(null);
          editorRef.current!.clear();
          notify();
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
    }
    return () => {
      editorRef.current!.destroy();
      editorRef.current = null;
    };
  }, []);


  return (
    <div className="create-post">
      <ToastContainer />
      <h1 className="create-post__title">Создать Пост</h1>
      <div className="create-post__input">
        <Input
          value={title}
          onChange={(event) => setTitle((event.target as HTMLInputElement).value)}
          label="Заголовок"
        />
      </div>
      <div className="create-post__game">
        <div className="create-post__game-img">
          <img src={gameImg ? gameImg : undefined} alt="game" />
        </div>
        <select value={game?.value} onChange={handleGameChange} className="create-post__select">
          {categories && categories.map((category) => (
            <option key={category.value} value={category.value} className="create-post__option">{category.name}</option>
          ))}
        </select>
      </div>
      <p className="create-post__subtitle">Текст</p>
      <div id="editor" className="create-post__editor" />
      <div className="create-post__btn">
        <Btn onClick={handleBtnClick}>
          Создать
        </Btn>
      </div>
    </div>
  );
};
