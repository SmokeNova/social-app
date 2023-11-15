import { X } from 'lucide-react';
import { Tag } from '..';

export default function Tags({
  tags,
  changeTags,
  editable = false,
}: {
  tags: string[];
  changeTags?: (value: string[]) => void;
  editable?: boolean;
}) {
  const removeTag = (idx: number) => {
    const newTags = tags.filter((_, i) => i !== idx);
    changeTags?.(newTags);
  };

  return (
    <div className='flex gap-3 flex-wrap'>
      {tags.map((tag, idx) => (
        <Tag editable={editable} index={idx} tag={tag} key={idx} removeTag={removeTag} />
      ))}
    </div>
  );
}
