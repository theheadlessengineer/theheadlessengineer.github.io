import { PageHeader, PageHeaderProps } from '@/components/molecules/PageHeader';
import { ArticleContent } from '@/components/molecules/ArticleContent';
import { BackLink } from '@/components/atoms/BackLink';
import styles from './ContentDetail.module.css';

export interface ContentDetailProps {
  readonly header: PageHeaderProps;
  readonly content: string;
  readonly backLink: {
    readonly href: string;
    readonly text: string;
  };
  readonly sidebar?: React.ReactNode;
  readonly jsonLd?: object;
}

export function ContentDetail({
  header,
  content,
  backLink,
  sidebar,
  jsonLd,
}: ContentDetailProps): JSX.Element {
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <article className={styles.article}>
        <PageHeader {...header} />
        <ArticleContent html={content} />
        {sidebar && <div className={styles.sidebar}>{sidebar}</div>}
        <BackLink href={backLink.href} text={backLink.text} />
      </article>
    </>
  );
}
