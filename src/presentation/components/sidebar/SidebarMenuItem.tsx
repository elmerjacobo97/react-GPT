import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  icon: string;
  title: string;
  description: string;
}

export const SidebarMenuItem = ({ to, icon, title, description }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex justify-center items-center px-3 py-2 rounded-lg text-base font-medium transition-colors cursor-pointer ${
          isActive ? 'text-indigo-500 bg-white bg-opacity-10' : 'text-white'
        }`
      }
    >
      <i className={`${icon} text-2xl mr-4 text-indigo-400`} />
      <div className="flex flex-col flex-grow">
        <span className="text-lg font-semibold text-white">{title}</span>
        <span className="text-sm text-gray-400">{description}</span>
      </div>
    </NavLink>
  );
};
