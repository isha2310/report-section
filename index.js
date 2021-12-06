$(document).ready(function () {

    // let payload = {
    //     token: "W2yMnwfgn5FGoNPZORN0xg",
    //     "data": {
    //         "user_funnel": {
    //             "Total IVs": "1.08M",
    //             "Total IV Users": "157.54K",
    //             "ATCs": "161.33K",
    //             "ATC Users": "50.05K",
    //             "Orders": "7.34K",
    //             "Purchasers": "6.42K"
    //         },
    //         "calculated_fields": {
    //             "NMV/IV":"5.33",
    //             "NMV/IV_Users":"36.63",
    //             "Conversion Rate":"4.66%",
    //             "NMV/ATC":"35.77",
    //             "NMV/ATC_Users":"115.28",
    //             "ASP": "169",
    //             "AOV":"787",
    //             "NMV/Purchasers":"900",
    //             "Quantity/Order":"4.65"
    //         },
    //         "miscellaneous":{
    //             "MRP":"8.35M", 
    //             "Quantity": "34.12K", 
    //             "Discount %":"30.81%"
    //         },
    //         "nmv_freebies": {
    //             "NMV": "5.78M",
    //             "Offer Led MRP (Freebies)": "26.19K",
    //             "PB NMV": "1.21M",
    //             "Sampling MRP (Freebies)": "9.00",
    //             "TP Only NMV": "3.99M",
    //             "Liquidation MRP (Freebies)": "938.72K",
    //             "Retailer NMV": "96.41K",
    //             "Total Freebie Qty": "6.04K"
    //         }
    //           }
    // };

    let payload  
    
    $.ajax({
      type: "GET",
      url: "http://34.132.95.222:8081/v1/getalldata",
      crossDomain:true,
          contentType:'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
      success: function(res) {
          console.log(res)
          let resp = res.mainTable
            let arr_users = resp.user_funnel
            let arr_fields = resp.calculatedFields
            let arr_miscellaneous = resp.miscellaneous
            let arr_nmv = resp.nmv_freebies
            let arr0 = [
                "Total IVs",
                "Total IV Users",
                "ATCs",
                "ATC Users",
                "Orders",
                "Purchaser",
              ];
              let arr1 = [
                "NMV/IV",
                "NMV/IV_Users",
                "Conversion Rate",
                "NMV/ ATC",
                "NMV/ ATC_Users",
                "ASP",
                "AOV",
                "NMV/ Purchasers",
                "Quantity/ Order",
              ];
              let arr2 = ["MRP", "Quantity", "Discount %"];
              let arr3 = [
                "NMV",
                "Offer Led MRP (Freebies)",
                "PB NMV",
                "Sampling MRP (Freebies)",
                "TP Only NMV",
                "Liquidation MRP (Freebies)",
                "Retailer NMV",
                "Total Freebie Qty",
              ];

              for (let key of Object.keys(arr_users)) {
                let div = document.createElement("div");
                div.classList.add("report_element", "report_element1");
                let p1 = document.createElement("p");
                p1.innerHTML = key;
                p1.classList.add("report-element_heading");
                let p2 = document.createElement("p");
                p2.innerHTML = arr_users[key];
                p2.classList.add("report-element_count");
                div.append(p1, p2);
                $("#report_heading1_div").append(div);
            }

            for (let key of Object.keys(arr_fields)) {
                let div = document.createElement("div");
                div.classList.add("report_element", "report_element2");
                let p1 = document.createElement("p");
                p1.innerHTML = key;
                p1.classList.add("report-element_heading");
                let p2 = document.createElement("p");
                p2.innerHTML = arr_fields[key];
                p2.classList.add("report-element_count");
                div.append(p1, p2);
                $("#report_heading2_div").append(div);
            }

            for (let key of Object.keys(arr_miscellaneous)) {
                let div = document.createElement("div");
                div.classList.add("report_element", "report_element3");
                let p1 = document.createElement("p");
                p1.innerHTML = key;
                p1.classList.add("report-element_heading");
                let p2 = document.createElement("p");
                p2.innerHTML = arr_miscellaneous[key];
                p2.classList.add("report-element_count");
                div.append(p1, p2);
                $("#report_heading3_div").append(div);
            } 
            
            for (let key of Object.keys(arr_nmv)) {
                let div = document.createElement("div");
                div.classList.add("report_element", "report_element1");
                let p1 = document.createElement("p");
                p1.innerHTML = key;
                p1.classList.add("report-element_heading");
                let p2 = document.createElement("p");
                p2.innerHTML = arr_nmv[key];
                p2.classList.add("report-element_count");
                div.append(p1, p2);
                $("#report_heading4_div").append(div);
            }
            // let table_data = [
            //   ["Brand", "Qty", "MRP", "NMV", "Retail"],
            //   ["Good Vibes", 5, 500, 654, 5463],
            //   ["Good Vibes", 5, 500, 654, 5463],
            //   ["Good Vibes", 5, 500, 654, 5463],
            //   ["Good Vibes", 5, 500, 654, 5463],
            //   ["Good Vibes", 5, 500, 654, 5463],
            // ];
            // table_data.forEach((element, index) => {
            //   let row = document.createElement("tr");
            //   if (index === 0) {
            //     // row.classList.add("report_table_header")
            //     console.log(index);
            //     element.forEach((data) => {
            //       let header = document.createElement("TH");
            //       header.classList.add("report_table-data", "report_table_header");
            //       header.innerHTML = data;
            //       row.append(header);
            //     });
            //     $(".report_brandwise_table").append(row);
            //   } else {
            //     element.forEach((data) => {
            //       let row_data = document.createElement("td");
            //       row_data.classList.add("report_table-data");
            //       row_data.innerHTML = data;
            //       row.append(row_data);
            //     });
            //     $(".report_brandwise_table").append(row);
            //   }
            // });
            let table_data = [
              ["Brand", "Qty", "MRP", "NMV", "Retail", "Orders", "Coupons", "IV", "IV Users", "convrsn_rate", "ATC/IV Users", "NMV/IV", "NMV/User", "ATCs", "ATC_Users", "AOV", "ASP", "Dscount%", "Freebie_", "Freebie_Qty"]]
              table_data.forEach((element, index) => {
                let row = document.createElement("tr");
                if (index === 0) {
                  // row.classList.add("report_table_header")
                  console.log(index, element);
                  element.forEach((data) => {
                    let header = document.createElement("TH");
                    header.classList.add("report_table-data", "report_table_header", "table_data");
                    header.innerHTML = data;
                    if(data === 'Brand'){
                      header.classList.add("table_brand")
                    }
                    row.append(header);
                  });
                  $(".report_brandwise_table").append(row);
                }
              });
              let tab = res.brandWise
              tab.forEach((element) => {
                let row = document.createElement("tr");
                table_data[0].forEach((data) => {
                  let val = element[data] || 'N/A'
                  let row_data = document.createElement("td");
                  row_data.classList.add("report_table-data", "table_data");
                  row_data.innerHTML = val;
                  if(data === 'Brand'){
                    row_data.classList.add("table_brand")
                  }
                  row.append(row_data);
                })
                $(".report_brandwise_table").append(row);
              })
        },
        error:function(request,error){
          console.log(request, error)
        }
    });

  

  $("#dropbtn1").on("click", function () {
    document.getElementById("myDropdown1").classList.toggle("showDropdown");
  });
  $("#dropbtn2").on("click", function () {
    document.getElementById("myDropdown2").classList.toggle("showDropdown");
  });
  $("#dropbtn3").on("click", function () {
    document.getElementById("myDropdown3").classList.toggle("showDropdown");
  });

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("showDropdown")) {
          openDropdown.classList.remove("showDropdown");
        }
      }
    }
  };
});
