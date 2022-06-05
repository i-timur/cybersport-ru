import {FC, useEffect, useRef, useState} from 'react';
import EditorJS, {API, OutputData} from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Checklist from '@editorjs/checklist';
import {toast, ToastContainer} from 'react-toastify';
import Dropdown from 'react-dropdown';

import {Btn} from '../ui/Btn';
import {Input} from '../ui/Input';
import {http} from '../../../../client';
import {Post} from '../../../../interfaces';
import {categoryOptions, Option, postOptions} from '../../../../utils';
import {PostsService} from '../../../../services/postsService';

import './index.scss';
import 'react-dropdown/style.css';

export const CreatePost: FC = () => {
  const defaultGameOption: Option = {value: categoryOptions[0].value, label: categoryOptions[0].name};
  const defaultPostOption: Option = postOptions[0];
  const defaultGameImg = categoryOptions[0].img!;

  const [title, setTitle] = useState('');
  const [previewLink, setPreviewLink] = useState('');
  const [data, setData] = useState<OutputData | null>(null);
  const [game, setGame] = useState<Option>(defaultGameOption);
  const [postType, setPostType] = useState(defaultPostOption);
  const [gameImg, setGameImg] = useState<string>(defaultGameImg);

  const editorRef = useRef<EditorJS | null>(null);

  const postsService = new PostsService();

  const options = categoryOptions.map((category) => {
    return {
      label: category.name,
      value: category.value
    };
  });

  const handleGameChange = (option: {value: string;}) => {
    const category = categoryOptions.find((el) => el.value === option.value) || categoryOptions[0];
    setGame({label: category.name, value: category.value});
    setGameImg(category.img!);
  };

  const handlePostTypeChange = (option: {value: string;}) => {
    const postTypeOption = postOptions.find((el) => el.value === option.value) || postOptions[0];
    setPostType(postTypeOption);
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
        postType,
        previewLink,
        title,
        data,
        game: {name: game.label, value: game.value},
        comments: []
      };

      postsService.create(post).then(() => {
        setTitle('');
        setPreviewLink('');
        setPostType(defaultPostOption);
        setGame(defaultGameOption);
        setGameImg(defaultGameImg);
        setData(null);
        editorRef.current!.clear();
        notify();
      });

      // http.post('posts.json', post)
      //   .then(() => {
      //     setTitle('');
      //     setPreviewLink('');
      //     setPostType(defaultPostOption);
      //     setGame(defaultGameOption);
      //     setGameImg(defaultGameImg);
      //     setData(null);
      //     editorRef.current!.clear();
      //     notify();
      //   })
      //   .catch(() => {});
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
      <div className="create-post__container">
        <h1 className="create-post__title">Создать Пост</h1>
        <div>
          <p className="create-post__post-type">Выберите тип публикации</p>
          <Dropdown options={postOptions} value={postType} onChange={handlePostTypeChange} />
        </div>
        <div className="create-post__img">
          <Input
            label="Ссылка на превью"
            value={previewLink}
            onChange={(event) => setPreviewLink((event.target as HTMLInputElement).value)}
          />
        </div>
        <p className="create-post__subtitle">Выберите игру</p>
        <div className="create-post__game">
          <div className="create-post__game-img">
            <img src={gameImg} alt="game" />
          </div>
          <div className="create-post__game-dropdown">
            <Dropdown options={options} value={game} placeholder="Выберите игру" onChange={handleGameChange} />
          </div>
        </div>
        <div className="create-post__input">
          <Input
            value={title}
            onChange={(event) => setTitle((event.target as HTMLInputElement).value)}
            label="Заголовок"
          />
        </div>
        <p className="create-post__subtitle">Текст</p>
        <div id="editor" className="create-post__editor" />
        <div className="create-post__btn">
          <Btn onClick={handleBtnClick}>
            Создать
          </Btn>
        </div>
      </div>
    </div>
  );
};
