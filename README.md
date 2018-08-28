# ISED PORTAL 
### This project is a 'proof of concept' interface that provides a mashup of 3Scale in a multi tenant scenario. 

### It calls a set of API's from a NODE server (see ISED-NODE) which in turn use the 3SCALE API's which return:

* List of Tenants
* Services for each tenant
* Path mapping (swagger format)

### In order to run this, you will need to also run the ISED-NODE server. This system expects the ISED-NODE to be available on PORT 8001. This can be changed, but you will need to modify the 'bast url' references in the 'services.js' file.

