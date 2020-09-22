let customer = {
    meal: 0,
    taxRate: 0,
    tipPercentage: 0,
    tipTotalForDay: 0,
    mealCount: 0,
    tipTotal: function(){
        return this.meal * (this.tipPercentage / 100);
    },
    taxTotal: function(){
        return this.meal * (this.taxRate / 100);
    },
    subTotal: function(){
        return +this.meal + +this.taxTotal();
    },
    totalPrice: function(){
        return +this.subTotal() + +this.tipTotal();
    },
    avgTipPerMeal: function(){
        return +this.tipTotalForDay / +this.mealCount;
    }
}
function mealDetails(){
    const temp = `
    <div class="meal-detail-container">
        <div class="meal-detail">
            <h2>Enter the Meal Details</h2>
            <div class="meal-detail-display">
                <label>Base Meal Price: $</label>
                <input type="text" id="meal-price"/>
            </div>
            <div class="meal-detail-display">
                <label>Tax Rate: %</label>
                <input type="text" id="tax-rate"/>
            </div>
            <div class="meal-detail-display">
                <label>Tip Percentage: %</label>
                <input type="text" id="tip-rate"/>
            </div>
        </div>
        <div class="control-center">
            <button class="submit-info">Submit</button>
            <button class="cancel-info">Cancel</button>
        </div>
    </div>
    `;
return temp;
}
function customerCharges(){
    const temp = `
    <div class="info-section right-side-info">
        <div class="customer-charges">
            <h2>Customer Charges</h2>
            <div class="earnings-display">
                <label>Subtotal: </label>
                <span>$${customer.subTotal().toFixed(2)}</span>
            </div>
            <div class="earnings-display">
                <label>Tip: </label>
                <span>$${customer.tipTotal().toFixed(2)}</span>
            </div>
            <hr>
            <div class="earnings-display">
                <label>Total: </label>
                <span>$${customer.totalPrice().toFixed(2)}</span>
            </div>
        </div>
    </div>
    `;
    return temp;
}
function earningsInfo(){
    const temp = `
    <div class="earnings-info">
            <h2>My Earnings Info</h2>
            <div class="earnings-display">
                <label>Tip Total: </label>
                <span>$${customer.tipTotalForDay.toFixed(2)}</span>
            </div>
            <div class="earnings-display">
                <label>Meal Count: </label>
                <span>${customer.mealCount}</span>
            </div>
            <div class="earnings-display">
                <label>Average Tip Per Meal: </label>
                <span>$${customer.avgTipPerMeal().toFixed(2)}</span>
            </div>
     </div>
     <div class="">
     <button>RESET</button>
     </div>
    `;
    return temp;
}
function validateNumber(num){
    if(typeof num === null){
        throw new TypeError('THIS IS EMPTY');
    }
}
function assignData(){
    let mealBase = $('#meal-price').val();
    validateNumber(mealBase);
    customer.meal = $('#meal-price').val();
    let taxRate =  $('#tax-rate').val();
    validateNumber(taxRate);
    customer.taxRate = $('#tax-rate').val();
    let tipPerc = $('#tip-rate').val();
    validateNumber(tipPerc);
    customer.tipPercentage = $('#tip-rate').val();
    customer.tipTotalForDay += customer.tipTotal();
    customer.mealCount += 1;
}
function handleSubmit(){
    $('.control-center').on('click', '.submit-info', function(){
        console.log('SUBMIT BUTTON CLICKED');
        assignData();
        renderChargesSection();
        renderEarningsInfo();
    })
}
function handleCancel(){
    $('.control-center').on('click', '.cancel-info', function(){
        console.log('CANCEL BUTTON PRESSED');
        $('#meal-price').val('');
        $('#tax-rate').val('');
        $('#tip-rate').val('');
    })
}
function renderMainSection(){
    let page = '';
    page += mealDetails();
    $('.left-side').html(page);
}
function renderChargesSection(){
    let page = '';
    page += customerCharges();
    $('.right-side').html(page);
}
function renderEarningsInfo(){
    let page = '';
    page += earningsInfo();
    $('.bottom-right-side').html(page);
}
function main(){
    renderMainSection();
    handleSubmit();
    handleCancel();
}

$(main);
