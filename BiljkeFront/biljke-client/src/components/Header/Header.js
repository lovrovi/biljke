import React from 'react'
import styles from '../../styles/Header.module.css'
import sidebarStyles from '../../styles/Sidebar.module.css'
import biljkeStyles from '../../styles/Biljke.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

export default function Header({ router }) {
    const closeNav = () => {
        document.getElementById("navId").classList.remove(styles.open);
    }

    return (
        <div className={styles.header}>
            <Head>
                <script src="https://kit.fontawesome.com/3e3f615792.js" crossOrigin="anonymous"></script>
            </Head>
            <div className={styles.headerLeft}>
                <div className={styles.bars} onClick={() => {
                    document.getElementById("navId").classList.toggle(styles.open);
                }}><i aria-hidden className="fas fa-bars fa-lg"></i></div>
                <div className={styles.bars} onClick={() => {
                    document.getElementById("sidebarId")?.classList?.toggle(sidebarStyles.openSidebar);
                    document.getElementById("chevronId")?.classList?.toggle(sidebarStyles.openChevron);
                    document.getElementById("pageId")?.classList?.toggle(sidebarStyles.openPage);
                }}><i aria-hidden className="fas fa-cogs fa-lg"></i></div>
            </div>
            <Link href="/">
                <div className={styles.logo}>
                    <Image
                        src="/images/logo-bg.png"
                        alt="Logo"
                        width={50}
                        height={30}
                    />
                    <p><span>i</span>Plants</p>
                </div>
            </Link>

            <div id="navId" className={styles.nav}>
                <div className={styles.navLink} onClick={closeNav}>
                    <Link href="/">
                        Biljke
                    </Link>
                </div>
                <div className={styles.navLink} onClick={closeNav}>
                    <Link href="/skladiste">
                        Skladište
                    </Link>
                </div>
                <div className={styles.navLink} onClick={closeNav}>
                    <Link href="/narudzbe">
                        Narudžbe
                    </Link>
                </div>
                <div className={styles.navLink} onClick={closeNav}>
                    <Link href="/statistika">
                        Statistika
                    </Link>
                </div>
            </div>

            <div className={styles.headerRight}>

            {
                router.pathname === '/narudzbe' || router.pathname === '/statistika' ?
                    null :
                        <div className={styles.search} onClick={() => {
                            document?.getElementById("searchId")?.classList?.toggle(biljkeStyles.biljkeSearchHide);
                            if (!document?.getElementById("searchId")?.classList?.contains(biljkeStyles.biljkeSearchHide)) {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                })
                            }
                        }}><i aria-hidden className="fas fa-search fa-lg"></i></div>
                   

            }
             </div>


        </div>
    )
}
