import Head from 'next/head';
import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

type PageLayoutProps = {
	title: string;
	description: string;
	children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({
	title,
	description,
	children,
}) => {
	return (
		<div>
			<Head>
				<title className="font-bold text-btn">
					{title ? `H-TUBE - ${title}` : 'H-TUBE'}
				</title>
				<link rel="icon" href="/logo.png" />
				{description && <meta name="description" content={description} />}
			</Head>
			<Header />
			<main className="flex w-screen h-[88vh]">
				<Sidebar />
				<section className="h-full w-[85%] overflow-x-hidden overflow-y-auto">
					{children}
				</section>
			</main>
			<Footer />
		</div>
	);
};
export default PageLayout;
