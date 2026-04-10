import { Link, useLocation } from 'react-router-dom';

const tabs = [
    { label: 'Все котики', path: '/' },
    { label: 'Любимые котики', path: '/favorite-cats' },
];

export default function Navbar() {
    const { pathname } = useLocation();
    return (
        <nav className="bg-blue-500 px-4 py-2 flex items-center justify-between">
            <div className="flex gap-1">
                {tabs.map((tab) => (
                    <Link
                        className={`px-4 py-2 rounded text-sm transition-colors duration-150
                         ${pathname === tab.path ? 'bg-blue-700 text-white' : 'text-white hover:bg-blue-400'}`}
                        key={tab.path}
                        to={tab.path}
                    >
                        {tab.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
