import { IProducts } from './../store/store-home/products/IProducts';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class StoreService {

  authOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwtToken')
    })
  };

  catetoryEvent = new EventEmitter();
  cartEvent = new EventEmitter();
  filterTypeAddEvent = new EventEmitter();
  filterTypeRemoveEvent = new EventEmitter();
  searchEvent = new EventEmitter();
  filterBrandAddEvent = new EventEmitter();
  filterBrandRemoveEvent = new EventEmitter();
  cartViewEvent = new EventEmitter();

  constructor(private http: HttpClient) { }

  private server_url = environment.serverUrl;
  public notifyFetch: EventEmitter<any> = new EventEmitter();

  getProducts() {
    return this.http.get(this.server_url + '/getProducts');
  }
  getProductDetails(id) {
    return this.http.get<IProducts>(this.server_url + '/getProductDetails/' + id);
  }
  updateProduct(obj) {
 
    const body = JSON.stringify(obj);
    return this.http.put(this.server_url + '/updateProduct', body, this.authOptions);
  }
  addProduct(data) {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.server_url + '/newProduct', body, this.authOptions);
  }


  deleteProduct(product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    return this.http.delete(this.server_url + '/delProduct/' + product, httpOptions);
  }

  getProductByCategory(categoryName) {
    return this.http.get(this.server_url + '/getProductByCategory/' + categoryName);
  }
  getFilters() {
    return this.http.get(this.server_url + '/getFilters');
  }

  getFiltersByCategory(categoryName) {
    return this.http.get(this.server_url + '/getFiltersByCategory/' + categoryName);
  }
  getCartItems(useremail) {

    return this.http.get(this.server_url + '/getCartItem/' + useremail, this.authOptions);
  }
  addItemToCart(item) {


    return this.http.post(this.server_url + '/addItemToCart', item, this.authOptions);
  }

  getUserCartItems(userCartId) {

    return this.http.get(this.server_url + '/getUserCartItems/' + userCartId, this.authOptions);
  }

  incrementQuantity(item) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.server_url + '/incrementQuantity', item, this.authOptions);
    
  }

  decrementQuantity(item) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.server_url + '/decrementQuantity', item, this.authOptions);
  }


  incrementAvailability(product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.server_url + '/incrementAvailability', product, httpOptions);
  }

  decrementAvailability(product) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.server_url + '/decrementAvailability', product, httpOptions);
  }

  removeAllItems(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : localStorage.getItem('jwtToken')
      })
    };
    return this.http.get(this.server_url + '/removeAll/' + user, httpOptions);
  }

  removeOneItem(item) {
     return this.http.put(this.server_url + '/removeItem', item, this.authOptions);
  }

  confirmOrder(order) {
     return this.http.post(this.server_url + '/addOrder', order, this.authOptions);
  }

  getOrders(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.server_url + '/getOrders/' + user, this.authOptions);
  }



}
