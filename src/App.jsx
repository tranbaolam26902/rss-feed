import { useRef, useState } from 'react';
import Tag from './Tag';
import Post from './Post';

const tags = [
    {
        slug: 'khoa-hoc',
        text: 'Khoa học'
    },
    {
        slug: 'du-lich',
        text: 'Du lịch'
    },
    {
        slug: 'oto-xe-may',
        text: 'Xe'
    },
    {
        slug: 'giai-tri',
        text: 'Giải trí'
    }
];

function App() {
    /* States */
    const [posts, setPosts] = useState([]);

    /* Refs */
    const inputRef = useRef(null);
    const selectRef = useRef(null);

    /* Event handlers */
    const handleGetRSS = (e) => {
        e.preventDefault();

        fetch(inputRef.current.value)
            .then((res) => res.text())
            .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
            .then((data) => {
                const items = data.querySelectorAll('item');
                const result = [];
                let count = selectRef.current.value;

                items.forEach((item) => {
                    if (!count) return;

                    const id = item.querySelector('guid').innerHTML;
                    const title = item.querySelector('title').innerHTML;
                    const descriptionElement = item.querySelector('description').innerHTML;
                    const description = descriptionElement.slice(
                        descriptionElement.indexOf('</br>') + 5,
                        descriptionElement.length - 3
                    );
                    const link = item.querySelector('link').innerHTML;
                    const image = descriptionElement.slice(
                        descriptionElement.indexOf('src=') + 5,
                        descriptionElement.indexOf(' >') - 1
                    );
                    const date = new Date(item.querySelector('pubDate').innerHTML).toDateString('vi-VN');

                    result.push({
                        id,
                        title,
                        description,
                        link,
                        image,
                        date
                    });
                    count -= 1;
                });
                setPosts(result);
            });
    };
    const handleSelectTopic = (e) => {
        inputRef.current.value = e.target.value;
        handleGetRSS(e);
    };

    return (
        <section className='fixed p-16 w-screen h-screen overflow-auto bg-black'>
            <h1 className='mb-8 font-semibold text-4xl text-white uppercase text-center'>RSS READER</h1>
            <form className='flex items-center justify-center gap-4 mx-auto max-w-xl' onSubmit={handleGetRSS}>
                <input
                    ref={inputRef}
                    type='text'
                    autoFocus
                    placeholder='Enter URL'
                    className='flex-1 px-4 py-2 min-w-[20rem] bg-gray-50 rounded-xl'
                />
                <select ref={selectRef} defaultValue={5} className='px-4 py-2 bg-gray-50 rounded-xl'>
                    <option value={5}>5 posts</option>
                    <option value={10}>10 posts</option>
                    <option value={15}>15 posts</option>
                    <option value={20}>20 posts</option>
                </select>
                <button
                    type='submit'
                    className='px-8 py-1.5 h-full text-black text-xl bg-white rounded-xl transition duration-200 hover:bg-opacity-80'
                >
                    GET
                </button>
            </form>
            <section className='flex gap-4 mx-auto mt-4 max-w-xl'>
                {tags.map((tag, index) => (
                    <Tag
                        key={index}
                        value={`https://vnexpress.net/rss/${tag.slug}.rss`}
                        onClick={handleSelectTopic}
                        text={tag.text}
                    />
                ))}
            </section>
            <section className='flex flex-col gap-8 mt-8 mx-auto max-w-xl'>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        link={post.link}
                        image={post.image}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                    />
                ))}
            </section>
        </section>
    );
}

export default App;
