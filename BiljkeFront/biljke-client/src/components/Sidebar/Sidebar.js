import React from 'react'
import styles from '../../styles/Sidebar.module.css'

export default function Sidebar({ children }) {
    return (
        <>
        <div id="sidebarId" className={styles.sidebar}>
            {children}
            <div className={styles.chevron} onClick={(e) => {
                    document.getElementById("sidebarId")?.classList?.toggle(styles.openSidebar);
                    e.currentTarget?.childNodes[0]?.classList?.toggle(styles.openChevron);
                    document.getElementById("pageId")?.classList?.toggle(styles.openPage);
                }}><i id="chevronId" aria-hidden className={"fas fa-chevron-left fa-lg " + styles.openChevron + " " + styles.chevronArrow}></i></div>
        </div>
        </>
    )
}
