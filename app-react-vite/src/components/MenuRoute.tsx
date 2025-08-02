import { Link ,useLocation} from "react-router-dom"
type MenuRouteProps={
    link: {
    url: string;
    text: string;
    blank: boolean;
}
}
export default function MenuRoute({link}:MenuRouteProps) {
    const location = useLocation()
    
   const isActive =location.pathname.startsWith(link.url);
       
  return <Link to={link.url}  target={link.blank ? '_blank':''} className={` ${isActive ? 'bg-amber-400':''} font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}>
    {link.text}

  </Link>
}
