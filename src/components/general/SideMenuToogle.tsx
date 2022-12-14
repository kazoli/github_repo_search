import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

type tProps = {
  hideText: string;
  showText: string;
  show: boolean;
  action: () => void;
};

function SideMenuToogle(props: tProps) {
  return (
    <div className="side-menu-toogle" onClick={props.action}>
      {props.show ? (
        <>
          <MdKeyboardArrowLeft className="icon" />
          <label className="side-menu-toogle-label">{props.showText}</label>
        </>
      ) : (
        <>
          <label className="side-menu-toogle-label">{props.hideText}</label>
          <MdKeyboardArrowRight className="icon" />
        </>
      )}
    </div>
  );
}

export default SideMenuToogle;
