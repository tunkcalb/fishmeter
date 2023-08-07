import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import DogamGallery from "./dogam/DogamGallery";
import useCustomFont from "../font/useCustomFont";
import Calendarcheck from "./dogam/Calendarcheck";

const DATA = [
  {
    id: "1",
    state: false,
    title: "가자미",
    src1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_8bGpgJrbkNgRY1k17DBZfNxVJRdlfzjqA&usqp=CAU",
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "2",
    title: "감성돔",
    state: true,
    src1: "data:image/jpeg;base64,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",
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "3",
    title: "고등어",
    state: true,
    src1: "data:image/jpeg;base64,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",
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "4",
    title: "갈치",
    state: false,
    src1: "data:image/jpeg;base64,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",
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "5",
    title: "참치",
    state: false,
    src1: "data:image/jpeg;base64,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",
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "6",
    title: "Item6",
    state: true,
    src1: "https://cdn.newsquest.co.kr/news/photo/202211/201009_91217_3152.jpg",
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "7",
    title: "참치",
    state: false,
    src1: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEBISEhISFhAXFxcaExcVGBcVEhYVGBUXGBYVFRgYHSggGBolGxgVITEiJikrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHSUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALYBFQMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQj/xABAEAACAQIDBgMFBgIJBQEAAAAAAQIDEQQhMQUGEkFRYRNxgQciMpGhFEJSsdHwgsEWI0NicpKi4fEkU2Oy4hX/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACIRAQEAAgEEAgMBAAAAAAAAAAABAhEDEiExQRNRBCJhMv/aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERvFtf7OqVs5TqRTXPw071Gl5WX8SJc5xvdj1UxVXP3aMY049ON+9N/VL+E48/J0Ybjpx49WWnQcJiI1IRnB3jJXT7F451u1vC8NU8GrJvDqF07XcJNt8s2sn8zfsFi4VYRnB3jJJrrZ9VyLxcszn9TPC41fAB1YAAAAMbaOPp4elOtWnGFKCvKUtF+r7LNgZLI7A7bo1qs6dGfiOHxygm6UXpwup8Ll2TbyNIwePxG26s1Bzw+yYPhm1lWxLy9xv7sHF5pcnne+XQMDgqdGnGnShGFOKtGMVZIDIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACitWjCLlOUYxWrk0kvNsDzEVlCEpy+GKcn5JXZxmVVyUZNe9UqyqS82+J/WRum+O+eDWErQp4inUnJcK8N8au2uJOUfdWV9WcrlvLBONozfCmtNb2/Q8n5PHyZ2TGO/DljjvdT2Kq8XH3aS8tH/MqwW06tGo3Sk4u6jlzSzeWj5mqz3lSatTdk283bW9tE+pbhvOks6eeb+Lm3rocJ+NzT063lw+3YNlb+Jq1aHVpw5q74cn2Npwe2aFVpQqwcnpG6UvlqfPEd5o/9trK3xefYyqW9NLO8ZZrLJZZ36nqwnNjO8245fHfFfRgOI7J9o3gpKNSdrJcM7zjl21Xobzsj2lYOpfxakKVlfilJcD+dmn2t6nWZ2+ZY53HXitn2ztWlhaE69eajSgrt829FGK5ybsku5wLbm8VfbGLgpPgocajRo3uouTUVKdvinnryu0u9nf7fGe0q91xRwtNvwabyeas6lSzzk/8ASnbq3C7JxPh1IyWVmn6rO4zy1OxjN3u+n9kbOhhqFOjTVoQVl3fOT7t3fqZhF7tbYhi8NCtB3bVpr8M18S/n5NEoallnZKAAqAAAAAAAAABibU2nSw1KVWtNQpx1b/JLVvsgMssfbKfH4fHF1OcU7yS6tLReZzP+lOL2riPs+EcsPh/vT/tXDnKUl8C7LPudH2Vsynh6Sp0o2itXrKUucpt5yk+bZJdjMABQAAAAAAYu0tpUsPTdWvUhTprWUnZdkur7LM5PvT7Yvihgo2WnizV5vvCLyh5yu/7pZNjq209q0MPDjr1adOHJzko3fRX1fZGi7a9rOHp3VGlKbWkqr8GD7qNnUl/kV+pxHaO3a9ao6k6k5T/HKTlUt04nou0bLsR6qZt8/wA/M1JE7ui7Y9qmMrXUJ+GulGPB/rnxS+Siafi9pVK0uKrKU3FXvUnOpLyvJu3oR/Fl37BVbPPTRrqv1N+GVdTFTla8nlolkkuy5Ftyv+L1ZcVJP4X88n/uPBa+6/kyXa9lrLp9T30RW12PYxV+ZnaqZRtrY84fIy50721LTwz5NmtVNxZt5hS7lx4V35FUcHdZjVNxZVTyLlOtbqvI8qYbNFvwvmSzfmLuN/8AZ1vlRwM6kq0q9pRsoRSdNyunxzzumrNZJ6s6tsHffD1oXqV8LGT+GEKnHUt/ejZNPTLXy0PmmUGUqTMTCTwtu311gMdTrQU6cuKPWzXo080ZJ8tbM3zx1BKMMTVcFkoTk5wt04ZXVuyNs2H7XKtCPDLDUmm8+Hjj8o8TjfyUR00d5BzjYXtTw1Rvx60Ip5pOEoyjpaLldw68zdtj7XjiE3CE1FaN2cZLk4yi2n5XIJEFEKsXezTtrZp2ffoVgADyUkk23ZLVvRICP29tmlg6E69Z2hHRL4pS5RiubZwPeTeGvjq/iVXaP9nTTvGEey69ZO1/Kxf3+3re0MTeL/6Wm2qEeUuUqrXWXLpG2l2X/Zvsn7VjacZL+rh78rWs+HNRl5u37ZjK3xCOrezzd+OFwkW42rVFxTbtxJP4Y+SX1ZtIBqTUAAFAAxNrbQhh6FSvUvwQi5NRV5Pokurdl6gZZzjfX2rUMK5UcJw18Sm1J3fgU2ss2vjafKPe7Rp+9u8+O2jenFSoYR5eHF+9Nf8Allzy+6svPUgMLu5w6rNW/wBzpOO+2LnELt3bGJxlTxcTUnUnnw3yhFPlCKyivL1Ix030ZuE9m5PJqMfRu7tGN3krtpXeSvdlOztnTcoQq0+Go+K8G1xRSs4ylbON3xRz1tfIzuS6a76a7T2fdapFcNku/J5q/qdBp7s+7eybb4Vbq1lr/EV19jyiruK4U3Z87qWn1R0tx0x+zT6OxU7Kzs7W9bW/NFa2G3F+7osvle35o3inhFZWVtLeqUv1K/snCnk/vPvkl18hcoklc3xGzJXSassvLVCnhJx1k0ks87LmT+2vFlLhp0vV2bt5aL5kHiNk4h51IVPW3pkjl82Lp0VSqkVrNX8r59ynxofi6/d+Rbp4BvLhfqn+hl0tkNu0c5drt/LUfLfUOifZSqxf9ql2asui1VuZk0cOpr3eGX+FpPLnbr+h4t3p87q2vurLz4mjYNiez6vXaaTVPVykrR9PxPy+Zqc/8ZvH/UL/APkS1X1XXTPyL9PYsuf09bfOx0/Zm4kaUbNuXnp6K7tqZM90suX/ABxfqd5yTXhxuOTk1XYLTs3bO2nLPNfJlmpsB3eWav8Akdde7TV81ytlfnf8zz+jL1dn9PPQdWJrJxbEbEqJvLuvTUxZbPnG+X7zO4vdWLvpmYs90Vnpb1J1Yr+zis8JJ6w5Pl0zLFXBtWya5nap7oLorWt9P92YVbc1XeS7Z9U/1+hLcV3k45PBvN/L6su4StXp28OpOKk9IyaUsucb2l6nXFuQn2y/Ux5bgNt2cdcr5Gf1amWTStme0DG4ZNRdPP45KEYVZLleaX5I3zdv2uYaFGNOpHE+Jn79ZqdPy46ac2l3jcwK3s+5e5bln5WMWp7PYLWcV833/QxccfTXXfcdR2DvdSr0nOVSjKS0jQn4spJLNqmvejnyaNQ9pm/1J4WWGw0peNVvGreLi6dP7yd+cllbo2+hqctwqSafi5p8uK+vbQjsbsnDUajjOs/EVn70ZJ59eLrk7menXterfpraq8r/AKI6/wCw3Z9o4iu08+GEX1tdya652+Ry3aUqN2oNSfVR4V3u+Z2/2O11LZyta8Zyi87vJ5XyyM61WpW8gAoAAAW8RQjOLhOKlBqzTV00XC3XjJxai7Pra4Gq7V3KhJXw8uB/hlnB+T1X1NVrbOnSm4ThOMlna17pPVPmu6N+xNOrHWo7PnaVv/YjMZsh1VnVlxL4ZXb4X6/kZvVSXGNXp4ZSdnwtc1brk8jLwOxqNNe7TjF9lb/kyaey67rrxOBKnrKL+O+nK/71JR4PqSY2tXOIZxvle1//AK/m18jKqU1KnLvxfyf5lVfDNckUwi3GVtbNeryN955Z3L4RKo/yL1SL91LNvJeRm0MI+evLpYqnRfFks7Wj1u00vle/kiztN081E7N2dxWyJ3C7Mzs17nyfl5ExsnZigldZ/oTPhrocZN92rfTmu3N10pJ0qU3dZqEeO75a5Iytmbp15xs0qMOfH70/SMbW/wAx0OMUj250k1NM1ruzd0MPRanKPiTWkp2dn1StZE8r8skVpdT0s7ClRPPCXf5srPS7TSjwl0DproVXKZTS1Jaq3LDxZQ8Gu/0PauKSRE4vaD5MnVilqQnRprV/Uwq9elFcvzIevWk823bybLWFwM69+CUW1rGbcWl3tF2L14xNZVmVtowWjv5K35kfX2tySzemrbJbAbutt+Mmly4ZLN+XDf1v6Ers7Y0KM3KEp2atwtrh83ldvuzNuV8TS9P3WoUKNatfhi8ldpON/le5N4LdmMo3qeJGXRuFvkk/zNkUEm2krvV835lQmP3V7ekbhdi0oQ4HFTT140n8ssjWvaLuTDF4S9CCjiaMW6XDlxx1lSfny6Ps2buC6i7fJHgu9ne/71R1n2GYvhniaDnlJRnCL1um1J/WJge1Hdj7PiftEFajWbb/AAxq6yTtopZyX8XQh9yNo/Z8dRqP4OK03paMk4u9k8s/pyOXVZV0+hQeI9OzIAAAAA8aMWpgVrH3X20MsA0iqmHad5Rz0un+ZalQWbuyaKJ0kzUyjFxvpBVMJdWXzeRZnhEslayzvzbJ/wADnk38izWjLlC/la31ZeuJ01BUsNKTta0FrJ5K3XuZuBwMVPjlnygui6+by8slyLrbycoyy5NNRXp/M8VV8rGOvG+UymU8JSEkV8REuu0HjmtLFtxSZZTylrjiIhbRfQ9W0Cbx+zrqWUj3iIf7c3yZ6sb8zGXJjPbUytSrmUSqLm0YCnOWkZP0svmzIhg2/ify/U5/Jlf8xvVVyxMSF2vvDQoq9SpGN9ObZOfY4c4p+ea+WhEbz7p0MbTaklCr92pFZp2suJZcS7fVD4875qtVxe9vG7UabmvxOVl6JXZtGxtneLSU68HGTV1ac45Pqsvrc5tHDVNmYiMcVBcF7Qnm6c0nykudk/defbmdiwGMhWpxqU5KUJK6a/eow49Xut16UbNwEaMXGMpyu73m7vsZEKUU21FJt3k0rNvS76lYO0mkAAUAAAAAGFtnZlPE0J0KqvCat3T1Ul0aeZwPeHYNXA13TqLL7k0vdnH8S/muX5/RJgba2PRxdJ0q0eKL0ekovlKL5MxljtZUJ7PNuLE4WMG71aSUZXd24/dk3btb07m1HKsPs2tsbFKrK9TCv3ZVEnbhb++lfhksn0duWh1DC4iNSEZwkpQkrxazTQ4961SroANoAAAAAAAAAAAUSpp6pPzVysAR2O2TCcGoRjCdnwyXu597ar96mgyxVSM+C87puL953uutnZvVeh080ffXAuFVVl8E9e1RLJ9rpJ+cX1OXJO228POmAtqTUk1NeU0pRa81Z/vK5vOBpU6lOFRRi1KKeWazXK5zio1VdOMV71SXBHlZvJvLNW1+p1DC0I04QpxVoRioxXZKyHHj27plrfZ4sLD8Efki5GCWiS8ioHSYyMgAKAAAs4zCQqwlTqwjOnJWlGSTi15M1GnuXUwlR1NnYl04v4qFa9ShLsn8UfPN9zdABFYPalT4cRh6lKa5x/raUu8ZQzS/xKJKJnoAAAAAAAAAAACmcFJNNJp5NPNNdGjC2Zsejh+LwYcEZO7inLw79YwbtH0sZ4AAAAAAAAAAAAAAAAAFnGYaNWEqc1eMlZ/qujWty8ANM3f3bnSxspTX9TTu6cuUpSTin58N79Gu5uYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q==",
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
];

function FontText({ fontFileName, children }) {
  const isFontLoaded = useCustomFont(fontFileName);

  if (!isFontLoaded) {
    return null;
  }

  return <Text style={styles.text}>{children}</Text>;
}

const Stack = createStackNavigator();

const DogamScreen = ({ navigation }) => {
  const [pressedItem, setPressedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    "https://thumb.ac-illust.com/ba/ba2f532c978df3f103d4b389fb6090e3_t.jpeg"
  ); // 추가: 선택된 이미지 상태 변수

  const [searchKeyword, setSearchKeyword] = useState(""); // 추가: 검색어 state
  // 검색어에 해당하는 항목들만 필터링하여 반환하는 함수
  const searchFilter = (item) => {
    return item.title.includes(searchKeyword);
  };

  // 화면 바꿔서 보여주는 함수
  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const renderItem = ({ item }) => {
    const isPressed = pressedItem === item.id;
    return (
      <View
        style={{
          marginHorizontal: 18,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DogamGallery", {
              itemId: item.id,
              itemName: item.title,
            });
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <View style={{ width: 90, height: 90 }}>
              <Image
                source={{ uri: item.src1 }}
                style={[
                  styles.dogamItem,
                  isPressed ? styles.itemPressed : null,
                ]}
                resizeMode="stretch"
              />
            </View>
            <View style={{ paddingTop: 5 }}>
              <Text>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dogam}>
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row", // 가로 방향으로 정렬
            justifyContent: "center", // 자식들 사이에 공간을 나눔
            width: "90%", // 부모 View의 90% 너비로 설정
          }}
        >
          <TouchableOpacity
            onPress={() =>
              handleImageClick(
                "https://thumb.ac-illust.com/ba/ba2f532c978df3f103d4b389fb6090e3_t.jpeg"
              )
            }
          >
            <Image
              source={{
                uri: "https://thumb.ac-illust.com/ba/ba2f532c978df3f103d4b389fb6090e3_t.jpeg",
              }}
              style={{ width: 90, height: 90, marginHorizontal: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleImageClick(
                "https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-c4d-stereo-calendar-free-download-image_1183607.jpg"
              )
            }
          >
            <Image
              source={{
                uri: "https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-c4d-stereo-calendar-free-download-image_1183607.jpg",
              }}
              style={{ width: 90, height: 90, marginHorizontal: 40 }}
            />
          </TouchableOpacity>
        </View>
        {/* 선택된 이미지가 있을 경우에만 아래 내용 표시 */}
        {selectedImage ===
          "https://thumb.ac-illust.com/ba/ba2f532c978df3f103d4b389fb6090e3_t.jpeg" && (
          <>
            <FontText
              fontFileName={require("../assets/fonts/Yeongdeok_Sea.ttf")}
            >
              <Text style={{ fontSize: 30 }}>어종별</Text>
            </FontText>
            <FontText
              fontFileName={require("../assets/fonts/Yeongdeok_Sea.ttf")}
            >
              <Text style={styles.catchCnt}>잡은 수 : 7</Text>
            </FontText>
            <TextInput
              style={{
                width: 300,
                height: 40,
                borderColor: "gray",
                paddingHorizontal: 10,
                marginTop: 10,
                borderRadius: 20,
                borderWidth: 0.2,
                marginBottom: 20,
              }}
              onChangeText={(text) => setSearchKeyword(text)}
              value={searchKeyword}
              placeholder="어종을 입력하세요"
            />

            <View style={styles.flatList}>
              <FlatList
                data={DATA.filter(searchFilter)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
              ></FlatList>
            </View>
          </>
        )}
        {/* 선택된 이미지에 따라 Calendar 컴포넌트 조건부 렌더링 */}
        {selectedImage ===
          "https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-c4d-stereo-calendar-free-download-image_1183607.jpg" && (
          <View>
            <FontText
              fontFileName={require("../assets/fonts/Yeongdeok_Sea.ttf")}
            >
              <Text style={{ fontSize: 30 }}>날짜별</Text>
            </FontText>
            <View style={{ width: 400, marginTop: 10 }}>
              <Calendarcheck navigation={navigation} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DogamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#FCFCFC",
  },
  dogamItem: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  dogam: {
    //width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    color: "black",
    textAlign: "center",
    fontSize: 36,
  },
  catchCnt: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
  },
  flatList: {
    flex: 1,
    paddingBottom: 55,
    // width: "100%",
    // justifyContent: "center",
    // alignContent: "center",
    // paddingBottom: 40,
  },
  text: {
    fontFamily: "customFont",
    fontSize: 18,
    textAlign: "center",
  },
});