import { Fragment, useState, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/theme";

const classNames = (...classes: string[]): string =>
	classes.filter(Boolean).join(" ");

const Appbar = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const [enabled, setEnabled] = useState(theme === "light" ? false : true);

	const toggleTheme = () => {
		setEnabled(!enabled);
		setTheme(enabled ? "light" : "dark");
	};

	const { pathname } = useLocation();

	const navigation = [
		{ name: "Projects", href: "/account/projects" },
		{ name: "Members", href: "/account/members" },
	];

	const mobileNavigation = [
		{ name: "Projects", href: "/account/projects", current: false },
		{ name: "Members", href: "/account/members", current: false },
		{ name: "Sign out", href: "/logout" },
	];

	return (
		<>
			<Disclosure as="nav" className="glass-nav sticky top-0 z-40 px-6 py-3 flex items-center justify-between">
				{() => (
					<div className="w-full flex items-center justify-between">
						<div className="flex items-center gap-8">
							<div className="flex-shrink-0">
                                <h1 className="text-xl font-bold tracking-tight text-display cursor-pointer">Smarter Tasks</h1>
							</div>
							<div className="hidden md:flex gap-6 text-sm font-medium">
								{navigation.map((item) => {
									const isCurrent = pathname.includes(item.href);

									return (
										<Link
											key={item.name}
											to={item.href}
											className={classNames(
												isCurrent ? "text-accent" : "text-muted hover:text-fg",
												"text-sm font-medium"
											)}
											aria-current={isCurrent ? "page" : undefined}
										>
											{item.name}
										</Link>
									);
								})}
							</div>
						</div>
						<div className="flex items-center gap-4">
                            <button onClick={toggleTheme} className="p-2 hover:bg-surface border border-base rounded-lg text-muted transition-colors">
                                {enabled ? '🌙' : '🌞'}
                            </button>
							<div className="hidden md:block">
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-accent/20">JD</div>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-surface border border-base py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
											<Menu.Item key={"signout"}>
												<a
													href={"/logout"}
													className="block px-4 py-2 text-sm text-muted hover:text-fg hover:bg-bg transition-colors"
												>
													Sign out
												</a>
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
                            <div className="md:hidden">
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-accent/20">JD</div>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-surface border border-base py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                                            {mobileNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {() => (
                                                        <a
                                                            href={item.href}
                                                            className="block px-4 py-2 text-sm text-muted hover:text-fg hover:bg-bg transition-colors"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
						</div>
					</div>
				)}
			</Disclosure>
		</>
	);
};

export default Appbar;
