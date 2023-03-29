import { SortingOption } from "../../constants/statesEnums";

export default interface Book {
    id: string;
    kind: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      authors: string[];
      title: string;
      subtitle: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: {
        type: string;
        identifier: string;
      }[];
      readingModes: {
        text: boolean;
        image: boolean;
      };
      printType: string;
      categories: string[];
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
      };
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string;
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean;
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: {
        isAvailable: boolean;
      };
      pdf: {
        isAvailable: boolean;
      };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean;
    };
    searchInfo: {
      textSnippet: string;
    };
  }

  export default interface searchQueryParameters {
    sortingOption: SortingOption,
    searchQuery: string,
    startIndex: number,
    maxResults: number,
    category: string,
  }

  export interface BookState {
      totalItems: string,
      status: string;
      entities: {
        [id: string]: Book;
      };
      ids: string[];
  }

