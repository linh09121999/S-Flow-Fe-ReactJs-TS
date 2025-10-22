import api from "./api";
import axios, { type AxiosResponse } from "axios";

const apiKey = "MeJ9yXbaCnQB8bwfrDDrUQW3bicFP4VcbPLWeVCH"

export const getSources = () => api.get(`/v1/sources/?apiKey=${apiKey}`)

export const getRegions = () => api.get(`/v1/regions/?apiKey=${apiKey}`)

export const getNetworks = () => api.get(`/v1/networks/?apiKey=${apiKey}`)

export const getGenres = () => api.get(`/v1/genres/?apiKey=${apiKey}`)

export const getSearch = (
    searchField: string,
    searchValue: string,
    types?: string
) => api.get(`/v1/search/?apiKey=${apiKey}&search_field=${searchField}&search_value=${encodeURIComponent(searchValue)}&types=${types}`)

export const getAutocomplete = (
    searchValue: string,
    searchType: number
) => api.get(`/v1/autocomplete-search/?apiKey=${apiKey}&search_value=${encodeURIComponent(searchValue)}&search_type=${searchType}`)

export const getTitleDetails = (
    titleId: number,
    appendToResponse?: string,
    language?: string,
    regions?: string
) => api.get(`/v1/title/${titleId}/details/?apiKey=${apiKey}`)

export const getTitleStreamingSources = (
    titleId: number,
    regions?: string
) => api.get(`/v1/title/${titleId}/sources/?apiKey=${apiKey}`)

export const getTitleSeasons = (
    titleId: number
) => api.get(`/v1/title/${titleId}/seasons/?apiKey=${apiKey}`)

export const getTitleEpisodes = (
    titleId: number
) => api.get(`/v1/title/${titleId}/episodes/?apiKey=${apiKey}`)

export const getTitleCast_Crew = (
    titleId: number,
    language?: string
) => api.get(`/v1/title/${titleId}/cast-crew/?apiKey=${apiKey}&language=${language}`)

export const getListTitles = (
    types?: string,
    regions?: string,
    languages?: string[],
    sourceTypes?: string,
    sourceIds?: string,
    genres?: string,
    networkIds?: string,
    sortBy?: string,
    releaseDateStart?: number,
    releaseDateEnd?: number,
    userRatingHigh?: number,
    userRatingLow?: number,
    criticScoreHigh?: number,
    criticScoreLow?: number,
    personId?: number,
    page?: number,
    limit?: number
) => api.get(`/v1/list-titles/?apiKey=${apiKey}&source_ids=${sourceIds}&types=${types}&sortBy=${sortBy}`)

export const getStreamingReleases = (
    startDate?: number,
    endDate?: number,
    limit?: number
) => api.get(`/v1/releases/?apiKey=${apiKey}`)

export const getPerson = (
    personId: number
) => api.get(`/v1/person/${personId}?apiKey=${apiKey}`)

export const getNewTitles = (
    startDate?: number,
    endDate?: number,
    types?: string,
    page?: number,
    limit?: number
) => api.get(`/v1/changes/new_titles?apiKey=${apiKey}&types=${types}`)

export const getNewPeople = (
    startDate?: number,
    endDate?: number,
    page?: number,
    limit?: number
) => api.get(`/v1/changes/new_people/?apiKey=${apiKey}`)

export const getTitlesWithChangedSources = (
    startDate?: number,
    endDate?: number,
    types?: string,
    regions?: string,
    page?: number,
    limit?: number
) => api.get(`/v1/changes/titles_sources_changed/?apiKey=${apiKey}&types=${types}`)

export const getTitlesWithChangedDetails = (
    startDate?: number,
    endDate?: number,
    types?: string,
    page?: number,
    limit?: number
) => api.get(`/v1/changes/titles_details_changed/?apiKey=${apiKey}&types=${types}`)

export const getTitlesWithChangedEpisodes = (
    startDate?: number,
    endDate?: number,
    page?: number,
    limit?: number
) => api.get(`/v1/changes/titles_episodes_changed/?apiKey=${apiKey}`)