import smartpy as sp

class land(sp.Contract):
    def __init__(self):
        self.init(
            landMap = sp.map(),    
        )
        

    @sp.entry_point       
    def landDetails(self, params):
            uid = params.uid
            self.data.landMap[uid] = sp.record(
            name = params.name, 
            fathersName=params.fathersName,
            age = params.age, 
            gender = params.gender, 
            PhoneNumber = params.PhoneNumber, 
            address = params.address,
            # Land Details
            # Land part no/ khasra no.
            lno = params.lno,
            # Area in square kms
            area=params.area,
           # Date and time of registry: 
            Date1 = params.Date1,
            time=params.time,
            # Rate Fixed per sqm
            rate=params.rate,
            #Link to doc containing map of property
            link=params.link,
           # Misc Comments
            comments = params.comments,
            
            
        )

@sp.add_test(name = "Adding Land Record ")
def test():
    scenario = sp.test_scenario()

    user = sp.test_account("Test")
    
    panjikaran1 = land()
    scenario += panjikaran1
    
    scenario.h1("Adding the Land Record")
    scenario += panjikaran1.landDetails(
        uid = "0123456789", 
        name = "Yuvraj Singh Deora", 
        fathersName="Samandar Singh",
        age = 20, 
        gender = "Male", 
        PhoneNumber = 6176179619, 
        address = "Rajput Vas Hadmatiya",
        # Land Details
            # Land part no/ khasra no.
            lno = "122",
            # Area in square kms
            area="1200Sqm",
           # Date and time of registry: 
            Date1 ="12-12-2022",
            time="12:23",
            # Rate Fixed per sqm
            rate="34/sqm",
            #Link to doc containing map of property
            link="https://mail.google.com/mail/u/2/#inbox?projector=1",
           # Misc Comments
            comments ="No comments please"
    )
    # scenario.show(vaxScene.balance)