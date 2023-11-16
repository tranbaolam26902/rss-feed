export default function Tag({ value, onClick, text }) {
    return (
        <button
            type='button'
            value={value}
            className='px-4 py-2 bg-white rounded-full transition duration-200 hover:bg-opacity-80'
            onClick={onClick}
        >
            {text}
        </button>
    );
}
