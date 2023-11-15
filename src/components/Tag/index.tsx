import { X } from 'lucide-react';
import Link from 'next/link';

export default function Tag({
  tag,
  index,
  removeTag,
  editable,
}: {
  tag: string;
  index?: number;
  editable: boolean;
  removeTag?: (idx: number) => void;
}) {
  return (
    <TagWrapper tagName={tag} editable={editable}>
      <div className='rounded py-1 px-2 flex gap-1 items-center border border-blue-700'>
        <span className='text-base font-semibold text-blue-700'>#{tag}</span>
        {removeTag !== undefined && index !== undefined && (
          <button type='button' onClick={() => removeTag(index)}>
            <X color='blue' size={18} />
          </button>
        )}
      </div>
    </TagWrapper>
  );
}

const TagWrapper = ({
  tagName,
  editable,
  children,
}: {
  tagName: string;
  editable: boolean;
  children: React.ReactNode;
}) => {
  return editable ? (
    children
  ) : (
    <Link href={`/search?q=${tagName}`}>{children}</Link>
  );
};
