export default function Post({ title, image, description, link, date }) {
    return (
        <div className='text-white'>
            <a href={link} target='_blank' rel='noreferrer' className='text-blue-400 underline'>
                <img src={image} alt={description} />
                <h1 className='text-2xl'>{title}</h1>
            </a>
            <p>{description}</p>
            <p>{date}</p>
        </div>
    );
}
