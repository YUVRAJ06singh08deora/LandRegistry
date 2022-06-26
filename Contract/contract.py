import smartpy as sp

class insuranc(sp.Contract):
    def __init__(self):
        self.init(
            insureMap = sp.map(),    
        )
        

    @sp.entry_point       
    def addInsuranceData(self, params):
            aadhar = params.aadhar
            self.data.insureMap[aadhar] = sp.record(
            #Date of birth
            dob = params.dob,
            #  Name
            name = params.name,
            #  Gender
            gender = params.gender,
            #Nationality
            nationality=params.nationality, 
            #Address
            address = params.address,
            # Phone Number
            phone = params.phone, 
            #Employement Status
            empStatus = params.empStatus,
            #Annual Income
            annualIncome = params.annualIncome,
            #insurancePlan
            insurancePlan= params.insurancePlan,
        )

@sp.add_test(name = "Adding Resource Data")
def test():
    scenario = sp.test_scenario()

    user = sp.test_account("Test")
    
    insuranc1 = insuranc()
    scenario += insuranc1
    
    scenario.h1("Add a new Entry")
    scenario += insuranc1.addInsuranceData(
            #aadhar
            aadhar= 41083197124,
            #Date of birth
            dob ="12/07/2002",
            #  Name
            name ="Yuvraj Singh Deora",
            #  Gender
            gender ="Male",
            #Nationality
            nationality="Indian", 
            #Address
            address ="Hadmatiya",
            # Phone Number
            phone =8976182128, 
            #Employement Status
            empStatus ="Employed",
            #Annual Income
            annualIncome ="120000",
            #insurancePlan
            insurancePlan="Monthly",
         
    )