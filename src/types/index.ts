export interface Article {
  title: string;
  date: Date;
  author: string;
  source: string;
  category: string;
  url: string;
  image?: string;
  tags?: string[];
}

export interface GuardianResponse {
  response: {
    results: {
      webTitle: string;
      webPublicationDate: string;
      webUrl: string;
      pillarName?: string;
      tags?: { webTitle: string }[];
      elements?: { assets?: { file: string }[] }[];
    }[];
  };
}

export interface NewsApiResponse {
  articles: {
    title: string;
    publishedAt: string;
    author?: string;
    source: { name: string };
    url: string;
    urlToImage?: string;
  }[];
}

export interface NytResponse {
  response: {
    docs: {
      headline: { main: string };
      pub_date: string;
      byline: { person?: { firstname?: string; lastname?: string }[] };
      source: string;
      news_desk?: string;
      web_url: string;
      multimedia?: { url?: string }[];
    }[];
  };
}
