export interface TicketMasterRoot {
    _embedded: TicketMasterEmbedded;
    page: TicketMasterPage;
  }
  
  export interface TicketMasterEmbedded {
    events: TicketMasterEvent[];
  }
  
  export interface TicketMasterEvent {
    name: string;
    type: string;
    id: string;
    test: boolean;
    url: string;
    locale: string;
    info?: string;
    pleaseNote?: string;
  }
  
  export interface TicketMasterPage {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
  