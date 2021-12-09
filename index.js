$(document).ready(function () {

  let selectedBrand = ""
  let to = 0
  let from = 0

  let brands = ['All Brands','Arata', 'Auric Beauty', 'Beard Hood', 'Beardo', 'Colorbar', 'Coloressence', 'Disguise Cosmetics', 'DoYou', 'Echt Beauti', 'GLAMVEDA', 'Globus Naturals', 'Juicy Chemistry', 'Khadi Essentials', 'La French', 'LetsShave', 'MCaffeine', 'Mancode', 'Nishman', 'Organic B', 'Pee Safe', 'Pinq', 'Prolixr', 'Pulp Cosmetics', 'Sirona', 'Skin Secrets', 'St Botanica', 'TAC - The Ayurveda Co.', 'The Beauty Co', "The Woman's Company", 'Ustraa'];

  brands.forEach((brand) => {
    let div = document.querySelector(".dropdown_brand");
    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.classList.add("brand-dropdown_items");
    a.innerHTML = brand;
    a.addEventListener("click", function () {
      selectedBrand = brand
      console.log(brand)
      if(brand === 'All Brands'){
        display_table({})
      } else{
        update_table({ brand });
      }
      $("#dropbtn1")[0].innerHTML = `${brand} <img src="https://cdn.shopify.com/s/files/1/0522/7020/3059/files/arrow.png?v=1637577853" class="dropdown_arrow">`;
    });
    div.append(a);
  });

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; 
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today)
  document.querySelector("#report_cal2").setAttribute("value", today);
  document.querySelector("#report_cal2").setAttribute("max", today);
  document.querySelector("#report_cal1").setAttribute("max", today);

  $("#report_cal1").on("change", function() {
    val = $(this)[0].value.toString()
    from = val
    update_table({from})
  })
  $("#report_cal2").on("change", function() {
    val = $(this)[0].value.toString()
    to = val
    update_table({to})
  })

  function display_table(payload) {
    data = JSON.stringify(payload);
    $.ajax({
      type: "GET",
      url: "http://34.132.95.222:8081/v1/getalldata",
      data: data,
      crossDomain: true,
      contentType: "application/json",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      success: function (res) {
        console.log(res);
        let resp = res.mainTable;
        let arr0 = [
          "IV",
          "IV Users",
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
        let arr2 = ["MRP", "Qty", "Discount %"];
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
        let flag = true
        try{
          while (flag){
            let d = document.querySelector(".report_element")
            if(d!==null){
              d.remove()
            } 
            let i = document.querySelector("tr")
            if(i!==null){
              i.remove()
            }
            if(d === null && i === null){
              flag = false
            }
          }
        } catch(e){
          console.log(e)
        }

        arr0.forEach((key) => {
          let div = document.createElement("div");
          div.classList.add("report_element", "report_element1");
          let p1 = document.createElement("p");
          p1.innerHTML = key;
          p1.classList.add("report-element_heading");
          let p2 = document.createElement("p");
          p2.innerHTML = resp[key] || "N/A";
          p2.classList.add("report-element_count");
          div.append(p1, p2);
          $("#report_heading1_div").append(div);
        });

        arr1.forEach((key) => {
          let div = document.createElement("div");
          div.classList.add("report_element", "report_element2");
          let p1 = document.createElement("p");
          p1.innerHTML = key;
          p1.classList.add("report-element_heading");
          let p2 = document.createElement("p");
          p2.innerHTML = resp[key] || "N/A";
          p2.classList.add("report-element_count");
          div.append(p1, p2);
          $("#report_heading2_div").append(div);
        });

        arr2.forEach((key) => {
          let div = document.createElement("div");
          div.classList.add("report_element", "report_element3");
          let p1 = document.createElement("p");
          p1.innerHTML = key;
          p1.classList.add("report-element_heading");
          let p2 = document.createElement("p");
          p2.innerHTML = resp[key] || "N/A";
          p2.classList.add("report-element_count");
          div.append(p1, p2);
          $("#report_heading3_div").append(div);
        });

        arr3.forEach((key) => {
          let div = document.createElement("div");
          div.classList.add("report_element", "report_element4");
          let p1 = document.createElement("p");
          p1.innerHTML = key;
          p1.classList.add("report-element_heading", "report-element_heading4");
          let p2 = document.createElement("p");
          p2.innerHTML = resp[key] || "N/A";
          p2.classList.add("report-element_count", "report-element_count_4");
          div.append(p1, p2);
          $("#report_heading4_div").append(div);
        });

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
          [
            "Brand",
            "Qty",
            "MRP",
            "NMV",
            "Retail",
            "Orders",
            "Coupons",
            "IV",
            "IV Users",
            "convrsn_rate",
            "ATC/IV Users",
            "NMV/IV",
            "NMV/User",
            "ATCs",
            "ATC_Users",
            "AOV",
            "ASP",
            "Dscount%",
            "Freebie_",
            "Freebie_Qty",
          ],
        ];
        table_data.forEach((element, index) => {
          let row = document.createElement("tr");
          if (index === 0) {
            // row.classList.add("report_table_header")
            console.log(index, element);
            element.forEach((data) => {
              let header = document.createElement("TH");
              header.classList.add(
                "report_table-data",
                "report_table_header",
                "table_data"
              );
              header.innerHTML = data;
              if (data === "Brand") {
                header.classList.add("table_brand");
              }
              row.append(header);
            });
            $(".report_brandwise_table").append(row);
          }
        });
        let tab = res.brandWise;
        tab.forEach((element) => {
          let row = document.createElement("tr");
          table_data[0].forEach((data) => {
            let val = element[data] || "N/A";
            let row_data = document.createElement("td");
            row_data.classList.add("report_table-data", "table_data");
            row_data.innerHTML = val;
            if (data === "Brand") {
              row_data.classList.add("table_brand");
            }
            row.append(row_data);
          });
          $(".report_brandwise_table").append(row);
        });
      },
      error: function (request, error) {
        console.log(request, error);
        alert("No data available for the brand!")
      },
    });
  }
  display_table({});

  function update_table(payload) {
    if (from ===0){
      yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
      from = yesterday.toJSON().toString().slice(0, yesterday.toJSON().toString().indexOf('T'));
      document.querySelector("#report_cal1").setAttribute("value", from);
    }
    if (to ===0){
      document.querySelector("#report_cal2").setAttribute("value", today);
      to = document.querySelector("#report_cal2").value.toString()
    }
    let data = {brand: selectedBrand, to, from, ...payload}
    let body_data = JSON.stringify(data);
    console.log(body_data)
    $.ajax({
      type: "POST",
      url: "http://34.132.95.222:8081/v1/getDataByFilter",
      data: body_data,
      crossDomain: true,
      contentType: "application/json",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      success: function (res) {
        console.log(res)

        let div1_children = [
          ...document.querySelector("#report_heading1_div").children,
        ];
        let div2_children = [
          ...document.querySelector("#report_heading2_div").children,
        ];
        let div3_children = [
          ...document.querySelector("#report_heading3_div").children,
        ];
        let div4_children = [
          ...document.querySelector("#report_heading4_div").children,
        ];
        //console.log(div1_children)
        div1_children.forEach((child) => {
          child.children[1].innerHTML =
            res[child.children[0].innerHTML] || "N/A";
        });
        div2_children.forEach((child) => {
          child.children[1].innerHTML =
            res[child.children[0].innerHTML] || "N/A";
        });
        div3_children.forEach((child) => {
          child.children[1].innerHTML =
            res[child.children[0].innerHTML] || "N/A";
        });
        div4_children.forEach((child) => {
          child.children[1].innerHTML =
            res[child.children[0].innerHTML] || "N/A";
        });

        let old_table = document.querySelector("#report_brandwise_table");
        old_table.remove();
        let table = document.createElement("table");
        table.classList.add("report_brandwise_table");
        table.setAttribute("id", "report_brandwise_table");
        let container = document.querySelector(
          ".report_brandwise_table_container"
        );
        container.append(table);
        let table_data = [
          [
            "Brand",
            "Qty",
            "MRP",
            "NMV",
            "Retail",
            "Orders",
            "Coupons",
            "IV",
            "IV Users",
            "convrsn_rate",
            "ATC/IV Users",
            "NMV/IV",
            "NMV/User",
            "ATCs",
            "ATC_Users",
            "AOV",
            "ASP",
            "Dscount%",
            "Freebie_",
            "Freebie_Qty",
          ],
        ];
        table_data.forEach((element, index) => {
          let row = document.createElement("tr");
          if (index === 0) {
            // row.classList.add("report_table_header")
            console.log(index, element);
            element.forEach((data) => {
              let header = document.createElement("TH");
              header.classList.add(
                "report_table-data",
                "report_table_header",
                "table_data"
              );
              header.innerHTML = data;
              if (data === "Brand") {
                header.classList.add("table_brand");
              }
              row.append(header);
            });
            $(".report_brandwise_table").append(row);
          }
        });
          let row = document.createElement("tr");
          table_data[0].forEach((data) => {
            let val
            val = res[data] || "N/A";
            if(data === 'Brand'){
              val = selectedBrand
            }
            let row_data = document.createElement("td");
            row_data.classList.add("report_table-data", "table_data");
            row_data.innerHTML = val;
            if (data === "Brand") {
              row_data.classList.add("table_brand");
            }
            row.append(row_data);
          });
          $(".report_brandwise_table").append(row);
      },
      error: function(xhr, status, error){
        $(".dropbtn")[0].innerHTML = `Brand Name <img src="https://cdn.shopify.com/s/files/1/0522/7020/3059/files/arrow.png?v=1637577853" class="dropdown_arrow">`
        console.log(xhr, status, error)
        var err = eval("(" + xhr.responseText + ")");
  //alert(err.Message);
      }
    });
  }

  $("#dropbtn1").on("click", function () {
    document.getElementById("myDropdown1").classList.toggle("showDropdown");
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
