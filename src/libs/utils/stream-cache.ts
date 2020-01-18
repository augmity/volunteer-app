import { BehaviorSubject, Observable, of } from 'rxjs';


export interface StreamCacheItem<T> {
  subject: BehaviorSubject<T>
}

export class StreamCache<K, V> {

  private cache = new Map<K, StreamCacheItem<V>>();

  has(key: K): boolean {
    return this.cache.has(key);
  }

  set(key: K, value: V) {
    if (!this.has(key)) {
      const cacheItem: StreamCacheItem<V> = {
        subject: new BehaviorSubject<V>(value)
      }
      this.cache.set(key, cacheItem);    
    } else {
      const cacheItem = this.cache.get(key);
      cacheItem?.subject.next(value);
    }
  }

  asObservable(key: K): Observable<V | undefined> {
    return this.has(key) ? this.cache.get(key)!.subject.asObservable() : of(undefined);
  }
}
