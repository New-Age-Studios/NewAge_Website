import Link from 'next/link';
import styles from './ScriptCard.module.css';

export default function ScriptCard({ script }) {
  return (
    <Link href={`/scripts/${script.id}`} className={styles.card}>
      {script.isNew && <div className={styles.badgeNew}>NEW</div>}
      
      <div className={styles.thumbnailWrapper}>
        <div className={styles.thumbnailGradient} style={{ background: script.gradient }}></div>
        <div className={styles.thumbnailMockUI}>
          <div className={styles.mockHeader}>
            <div className={styles.mockDot}></div>
            <div className={styles.mockDot}></div>
            <div className={styles.mockDot}></div>
          </div>
          <div className={styles.mockContent}>
            <div className={styles.mockImg}></div>
            <div className={styles.mockLines}>
              <div className={styles.mockLine} style={{width: '80%'}}></div>
              <div className={styles.mockLine} style={{width: '60%'}}></div>
              <div className={styles.mockLine} style={{width: '90%', marginTop: 'auto'}}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.tags}>
          {script.tags.map(tag => (
            <span key={tag} className={`${styles.tag} ${styles[`tag-${tag.toLowerCase()}`]}`}>
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
        
        <h3 className={styles.title}>{script.title}</h3>
        <p className={styles.price}>R${script.price}</p>
      </div>
    </Link>
  );
}
