<div>
<a name="readme-top"></a>
<h3 align="center">publish-subscribe-mechanism.</h3>

  <p  align="center">
    A project for pub-sub mechanism
  </p>
</div>

### Built With

* ExpressJS

<!-- USAGE EXAMPLES -->
## Usage

Handle incoming events: SALE_EVENT, REFILL_EVENT, LOW_STOCK_WARNING_EVENT, STOCK_LEVEL_OK_EVENT </br>
Endpoints to use:
* GET: /machine: return shared array machines
* POST /sale: trigger event sale by publishing name, machine </br>
  Body:
  ```sh
  {
   "eventType": "sale",
   "name":"machine 1",
   "machine": {
       "id": 1,
       "quantity": 98
      }
   }
   ```

* POST /refill: refill quantity </br>
  Body:
  ```sh
  {
   "eventType": "refill",
   "name": "machine 1",
   "machine": {
       "id": 1,
       "quantity": 99
     }
   }
   ```
