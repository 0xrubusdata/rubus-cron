export interface IFetcher {
    fetchData(): Promise<any[]>; // Returns a list of normalized objects
  }
  