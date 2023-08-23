import { useEffect, useState } from 'react';
import { AiOutlineUpCircle } from 'react-icons/ai';

function JumpTop() {
  const [jumpTop, setJumpTop] = useState(false);

  useEffect(() => {
    // scroll handle function
    const handleScroll = () => {
      const overLimit = window.scrollY > 200;
      // triggers setJumpTop only when previous value is changing
      overLimit !== jumpTop && setJumpTop(overLimit);
    };
    // event listener
    window.addEventListener('scroll', handleScroll);
    // cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jumpTop]);

  return (
    <>
      {jumpTop && (
        <AiOutlineUpCircle
          className="jump-top"
          title="Jump top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          }
        />
      )}
    </>
  );
}

export default JumpTop;
