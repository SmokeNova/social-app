import { X } from 'lucide-react';

export default function Tags({
  tags,
  changeTags,
}: {
  tags: string[];
  changeTags: (value: string[]) => void;
}) {
  const removeTag = (idx: number) => {
    const newTags = tags.filter((_, i) => i !== idx);
    changeTags(newTags);
  };

  return (
    <div className='flex gap-3 flex-wrap'>
      {tags.map((tag, idx) => (
        <div
          key={idx}
          className='rounded py-1 px-2 flex gap-1 items-center border border-blue-700'
        >
          <span className='text-base font-semibold text-blue-700'>#{tag}</span>
          <button type='button' onClick={() => removeTag(idx)}>
            <X color='blue' size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
