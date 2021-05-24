import React, { useState, useEffect } from "react";
import films from "../helpers/filmsData";
import { FilmItem } from "./FilmItem";
import { getFilmsFromApiWithSearchText } from "../API/TMDBApi";
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

const Search = () => {
  const [movie, setMovie] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);

  const _loadFilms = () => {
    setIsLoading(true);
    if (searchedText.length > 0) {
      getFilmsFromApiWithSearchText(searchedText, page + 1).then((data) => {
        setPage(data.page);
        setTotalPages(data.total_pages);
        setMovie([...movie, ...data.results]);
        setIsLoading(false);
      });
    }
  };

  const _searchFilms = async () => {
    // await _loadFilms();
    getFilmsFromApiWithSearchText(searchedText, 1).then((data) => {
      setMovie(data.results);
      setPage(data.page);
      setTotalPages(data.total_pages);
    });
    console.log(
      "Page: " +
        page +
        " / Total pages: " +
        totalPage +
        " /Nombre de film: " +
        movie.length
    );

    // setPage(0);
    // setTotalPages(0);
    // setMovie([]);
  };

  const _searchedTextInput = (text) => {
    setSearchedText(text);
  };

  return (
    <View style={style.main_container}>
      <TextInput
        onSubmitEditing={_searchFilms}
        onChangeText={(text) => _searchedTextInput(text)}
        placeholder="Titre du film"
        style={[style.textInput]}
      />
      <Button title="Rechercher" onPress={_searchFilms} />
      <FlatList
        data={movie}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FilmItem film={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (page < totalPage) {
            _loadFilms();
          }
        }}
      />
      {isLoading && (
        <View style={style.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

/*********************** */
/**Class Based Component */
/**
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      searchedText: "",
    };
  }

  _loadFilms() {
    if (this.state.searchedText.length > 0) {
      getFilmsFromApiWithSearchText(this.state.searchedText).then((data) =>
        this.setState({ films: data.results })
      );
    }
  }

  _searchedTextInput(text) {
    this.setState({ searchedText: text });
  }

  render() {
    return (
      <View style={style.main_container}>
        <TextInput
          onChangeText={(text) => this._searchedTextInput(text)}
          placeholder="Titre du film"
          style={[style.textInput]}
        />
        <Button title="Rechercher" onPress={() => this._loadFilms()} />
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
      </View>
    );
  }
}
 * 
 */

const style = StyleSheet.create({
  main_container: {
    marginTop: 20,
    flex: 1,
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    //   borderColor: "#000000",
    //   borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
